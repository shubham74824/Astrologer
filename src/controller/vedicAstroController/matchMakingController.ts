import {
  getMatchingData,
  AggregateMatchingService,
  NakashtraMatchingService,
} from "../../services/vedicAstroService/matchMakingService";
import { MatchingRequest, NakshatraRequest } from "../../types/matchingTypes";
import { Request, Response } from "express";

export const getAllMatchingDataController = async (
  req: Request,
  res: Response
) => {
  const request: MatchingRequest = req.body; // Main matching request
  const nakshatraRequest: NakshatraRequest = req.body; // Nakshatra matching request

  try {
    // Call all services in parallel
    const [matchingResult, aggregateResult, nakshatraResult] =
      await Promise.all([
        getMatchingData(request),
        AggregateMatchingService(request),
        NakashtraMatchingService(nakshatraRequest),
      ]);

    // Check if all services were successful
    if (
      !matchingResult.success ||
      !aggregateResult.success ||
      !nakshatraResult.success
    ) {
       res.status(500).json({
        success: false,
        error: "One or more services failed.",
      });
      return
    }

    // Format the response to match the required structure
    const response = {
      success: true,
      data: {
        details: [
          { Guna: "Varna", Maximum: 1, Obtained: matchingResult.data?.response.varna?.score || 0, Area_of_Life: "Work" },
          { Guna: "Vasya", Maximum: 2, Obtained: matchingResult.data?.response.vasya?.score || 0, Area_of_Life: "Dominance" },
          { Guna: "Tara", Maximum: 3, Obtained: matchingResult.data?.response.tara?.score || 0, Area_of_Life: "Destiny" },
          { Guna: "Yoni", Maximum: 4, Obtained: matchingResult.data?.response.yoni?.score || 0, Area_of_Life: "Mentality" },
          { Guna: "Maitri", Maximum: 5, Obtained: matchingResult.data?.response.grahamaitri?.score || 0, Area_of_Life: "Compatibility" },
          { Guna: "Gana", Maximum: 6, Obtained: matchingResult.data?.response.gana?.score || 0, Area_of_Life: "Guna Level" },
          { Guna: "Bhakoot", Maximum: 7, Obtained: matchingResult.data?.response.bhakoot?.score || 0, Area_of_Life: "Love" },
          { Guna: "Nadi", Maximum: 8, Obtained: matchingResult.data?.response.nadi?.score || 0, Area_of_Life: "Health" },
        ],
        additionalDetails: [
          { title: "Tara", description: matchingResult.data?.response.tara?.description || "Not Available" },
          { title: "Gana", description: matchingResult.data?.response.gana?.description || "Not Available" },
          { title: "Yoni", description: matchingResult.data?.response.yoni?.description || "Not Available" },
          { title: "Bhakoot", description: matchingResult.data?.response.bhakoot?.description || "Not Available" },
          { title: "Graha Maitri", description: matchingResult.data?.response.grahamaitri?.description || "Not Available" },
          { title: "Vasya", description: matchingResult.data?.response.vasya?.description || "Not Available" },
          { title: "Nadi", description: matchingResult.data?.response.nadi?.description || "Not Available" },
          { title: "Varna", description: matchingResult.data?.response.varna?.description || "Not Available" },
        ],
        birthDetails: {
          male: {
            name: "John Doe",
            dob: request.boy_dob || "1990-01-01",
            birthplace: "New York",
          },
          female: {
            name: "Jane Doe",
            dob: request.girl_dob || "1992-02-01",
            birthplace: "Los Angeles",
          },
        },
      },
    };
     
    // Send the formatted response
     res.status(200).json(response);
     console.log("response in details...",response)
     return
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
     res.status(500).json({
      success: false,
      error: "An error occurred while fetching match-making data.",
    });
    return
  }
};
