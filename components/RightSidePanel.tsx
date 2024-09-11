import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../lib/store';
import { fetchOrganizationDetails } from '../lib/organizationSlice';
import { getCookie } from 'cookies-next'; 
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { fetchCountries } from '@/lib/countriesSlice';
import { fetchIndustries } from '@/lib/industriesSlice';

interface RightSidePanelProps {
  isVisible: boolean;
  onClose: () => void;
  content: 'profile' | 'recommendation';
  selectedRecommendationId?: string;
}

const RightSidePanel: React.FC<RightSidePanelProps> = ({ isVisible, onClose, content }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const organization = useSelector((state: RootState) => state.organization);
  const countries = useSelector((state: RootState) => state.country.countriesByRegion);
  const industries = useSelector((state: RootState) => state.industory.industries);

  const token = getCookie('token'); // Get the access token from cookies

  React.useEffect(() => {
    if (content === 'profile' && user.organizationId && token) {
      dispatch(fetchOrganizationDetails({ organizationId: user.organizationId, token }));
    }
    dispatch(fetchCountries({token}));
    dispatch(fetchIndustries({token}));
  }, [dispatch, content, user.organizationId, token]);
  

  const getCountryName = (id: string) => {
    for (const region in countries) {
      const country = countries[region].find((country: { id: string }) => country.id === id);
      if (country) return country.name;
    }
    return 'Unknown';
  };

  const getIndustryName = (id: string) => {
    const industry = industries.find((industry: { id: string }) => industry.id === id);
    return industry ? industry.name : 'Unknown';
  };

  return (
    <div
      className={`fixed right-0 top-0 w-90 h-full bg-white shadow-lg transition-transform transform duration-300 ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="relative h-full flex flex-col p-6 bg-primary text-white">
        <button onClick={onClose} className="absolute top-4 right-4 text-white">
          <FontAwesomeIcon icon={faTimes} /> 
        </button>
        {content === 'profile' && organization.organization ? (
          <div className="mt-10">
            <h2 className="text-lg font-bold mb-4">{t('OrganizationDetails')}</h2>
            <p className="text-md mb-2">
              <span className="font-semibold">{t('OrganizationName')}:</span> 
              {organization.organization.name}
            </p>
            <p className="text-md mb-2">
            <span className="font-semibold"> {t('IndustryType')}:{" "}</span> 
              {getIndustryName(organization.organization.industryId)}
            </p>
            <p className="text-md mb-2">
              <span className="font-semibold">{t('Country')}:{" "}</span>
               {getCountryName(organization.organization.countryId)}
            </p>
          </div>
        ) : (
          <p className="text-md">{t('Select an option to display details')}</p>
        )}
      </div>
    </div>
  );
};

export default RightSidePanel;
