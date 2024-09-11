"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { fetchImpactRuns } from "../../lib/impactRunSlice";
import { fetchRecommendations } from "../../lib/recommendationSlice";
import GanttChart from "@/components/GanttChart";
import { getCookie } from "cookies-next";
import DateSelectionModal from "@/components/DateSelectionModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const ChartScreen: React.FC = () => {
  const dispatch = useDispatch();
  const impactRuns = useSelector(
    (state: RootState) => state.impactRuns.impactRuns
  );
  const recommendations = useSelector(
    (state: RootState) => state.recommendations.recommendations
  );

  const token = getCookie("token") as string;

  const [selectedImpactRun,setSelectedImpactRun] = useState<string>();
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<any>(null);

  useEffect(() => {
    if (token) {
      dispatch(fetchImpactRuns(token));
    }
  }, [dispatch, token]);
   // Handle impact run response and set selected impact run
   useEffect(() => {
    if (impactRuns.length > 0) {
      // Assuming you want to use the first impact run ID
      const firstImpactRunId = impactRuns[0].id;
      setSelectedImpactRun(firstImpactRunId);
    }
  }, [impactRuns]);
  useEffect(() => {
    
    if (selectedImpactRun) {
      dispatch(fetchRecommendations({ impactRunId: selectedImpactRun, token }));
    }
  }, [dispatch, selectedImpactRun, token]);

  const togglePanel = () => {
    setIsPanelMinimized(!isPanelMinimized);
  };

  const openDateModal = (rec: any) => {
    setSelectedRecommendation(rec);
    setIsModalOpen(true);
  };

  const handleDateSave = (startDate: string, endDate: string) => {
    if (selectedRecommendation) {
      selectedRecommendation.startDate = startDate;
      selectedRecommendation.endDate = endDate;
    }
  };
    
  const getRandomColor = () => {
    const colors = [
      "bg-primary",
      "bg-secondary",
      "bg-gradient-start",
      "bg-gradient-end",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Map recommendations to match the GanttChart expected structure
  const mappedRecommendations = recommendations.map((rec) => ({
    deleted: rec.deleted,
    dimensionId: rec.dimensionId,
    endDate: rec.endDate,
    id: rec.id,
    impactRunId: rec.impactRunId,
    importance: rec.importance,
    index: rec.index,
    scoreGap: rec.scoreGap,
    sessionGap: rec.sessionGap,
    startDate: rec.startDate,
    topicBenchmark: rec.topicBenchmark,
    topicRecommendation: rec.topicRecommendation,
    topicScore: rec.topicScore,
    urgency: rec.urgency,
    color: getRandomColor(),
  }));

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex h-screen-[-150px] overflow-hidden">
        {/* Left-side panel */}
        <div
          className={`bg-gray-100  transition-all m-3 rounded-md duration-300 
            
            ${isPanelMinimized ? "w-24" : "w-128"} 
            ${isPanelMinimized ? "p-0" : "p-4"} relative overflow-hidden`} // Set overflow-hidden here
        >
          <button
            onClick={togglePanel}
            className="absolute top-4 right-2 bg-slate-300 text-white px-2 rounded"
          >
            {isPanelMinimized ? ">" : "<"}
          </button>
          {!isPanelMinimized ? (
            <>
              <h2 className="text-md mb-5 font-semibold text-primary">
                Recommendations
              </h2>
              <ul className="mb-4">
                {recommendations.map((rec) => (
                  <li key={rec.id} className="mb-2">
                    <button
                      onClick={() => openDateModal(rec)}
                      className="relative text-black px-4 py-2 rounded w-full bg-slate-400"
                    >
                      {/* This div will be the part of the button with color */}
                      <div
                        className={`${getRandomColor()} absolute left-0 top-0 h-full rounded-l-md`}
                        style={{ width: "5%" }} // This makes the left 25% colored
                      />
                      <span>{rec.topicRecommendation.topic}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <button className="flex flex-row justify-start items-start w-full rounded-md bg-sky-300 p-5">
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  className=" text-3xl bg-black rounded-2xl cursor-pointer hover:text-blue-700"
                />
                <span className="px-3 text-lg text-black ">Add New Recomandation</span>
              </button>
            </>
          ) : (
            // When minimized, show a sliver of the buttons
            <div className="flex flex-col items-center justify-between h-full">
              <div className="flex flex-row items-center justify-center h-full w-full">
                <div className="flex-1">
                  <h2
                    className="text-md font-semibold text-primary mb-2"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Recommendations
                  </h2>
                </div>
                <div className="flex-1">
                  <ul className="space-y-2 mt-8">
                    {recommendations.map((rec) => (
                      <li key={rec.id} className="relative ">
                        <button
                          onClick={() => openDateModal(rec)}
                          className={`${getRandomColor()}  w-10 text-white  px-1 py-2 rounded-sm transform -translate-x-1/2`}
                        >
                          {/* You can display only part of the topic */}
                          {rec.topicRecommendation.topic.slice(0, 1)}...
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex rounded-md m-3 p-1">
                <button className="flex flex-row justify-start items-start w-full rounded-md bg-sky-300 ">
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    className=" text-3xl bg-black rounded-2xl cursor-pointer hover:text-blue-700 m-1"
                  />
                  <span className="m-1 text-lg text-black">Add</span>
                </button>
              </div>
            </div>
            
          )}
        </div>

        {/* Gantt Chart */}
        <div className="flex-1 p-4 bg-gray-100 text-black m-3 rounded-md  overflow-auto">
          <GanttChart data={mappedRecommendations} />
        </div>

        {/* Date Selection Modal */}
        <DateSelectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleDateSave}
        />
      </div>
    </div>
  );
};

export default ChartScreen;
