// @ts-check
 
/** @type {import('next').NextConfig} */
import { i18n } from './next-i18next.config.mjs';

const nextConfig = {
  // output: "export",
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/signIn',
        destination: 'https://dev.digitopia.co/api/a2/signIn',
      },
      // Proxy the organization details API
      {
        source: '/api/organization/:organizationId/detail',
        destination: 'http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8181/organization/:organizationId/detail',
      },
      {
        source: '/api/impact-run',
        destination: 'http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8484/impact-runs',
      },
      {
        source: '/api/impact-run/:impactRunId/recommendations',
        destination: 'http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8283/impact-run/:impactRunId/recommendations',
      },
      {
        source: '/api/countries',
        destination: 'http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8080/countries',
      },
      {
        source: '/api/industries',
        destination: 'http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8080/industries',
      }
    ];
  },
};

export default nextConfig;
