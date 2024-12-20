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
      return;
    }

    // Extract and format the response
    const response = {
      success: true,
      data: [
        {
          type: "North Matchmaking",
          score: matchingResult.data?.response.score,
          details: [
            {
              title: "Tara",
              description:
                matchingResult.data?.response.tara?.description ||
                "Not Available",
            },
            {
              title: "Gana",
              description:
                matchingResult.data?.response.gana?.description ||
                "Not Available",
            },
            {
              title: "Yoni",
              description:
                matchingResult.data?.response.yoni?.description ||
                "Not Available",
            },
            {
              title: "Bhakoot",
              description:
                matchingResult.data?.response.bhakoot?.description ||
                "Not Available",
            },
            {
              title: "Graha Maitri",
              description:
                matchingResult.data?.response.grahamaitri?.description ||
                "Not Available",
            },
            {
              title: "Vasya",
              description:
                matchingResult.data?.response.vasya?.description ||
                "Not Available",
            },
            {
              title: "Nadi",
              description:
                matchingResult.data?.response.nadi?.description ||
                "Not Available",
            },
            {
              title: "Varna",
              description:
                matchingResult.data?.response.varna?.description ||
                "Not Available",
            },
          ],
        },
        {
          type: "Aggregate Matchmaking",
          score: aggregateResult.data?.response.score,
          details: [
            {
              title: "Ashtakoot Score",
              value:
                aggregateResult.data?.response.ashtakoot_score ||
                "Not Available",
            },
            {
              title: "Dashkoot Score",
              value:
                aggregateResult.data?.response.dashkoot_score ||
                "Not Available",
            },
            {
              title: "Mangaldosh",
              value:
                aggregateResult.data?.response.mangaldosh || "Not Available",
            },
            {
              title: "Pitradosh",
              value:
                aggregateResult.data?.response.pitradosh || "Not Available",
            },
            {
              title: "Kaalsarpdosh",
              value:
                aggregateResult.data?.response.kaalsarpdosh || "Not Available",
            },
            {
              title: "Manglikdosh Saturn",
              value:
                aggregateResult.data?.response.manglikdosh_saturn ||
                "Not Available",
            },
            {
              title: "Manglikdosh Rahu-Ketu",
              value:
                aggregateResult.data?.response.manglikdosh_rahuketu ||
                "Not Available",
            },
          ],
        },
        {
          type: "Nakshatra Matchmaking",
          score: nakshatraResult.data?.response.score,
          details: [
            {
              title: "Dina",
              value: nakshatraResult.data?.response.dina || "Not Available",
            },
            {
              title: "Gana",
              value: nakshatraResult.data?.response.gana || "Not Available",
            },
            {
              title: "Mahendra",
              value: nakshatraResult.data?.response.mahendra || "Not Available",
            },
            {
              title: "Sthree",
              value: nakshatraResult.data?.response.sthree || "Not Available",
            },
            {
              title: "Yoni",
              value: nakshatraResult.data?.response.yoni || "Not Available",
            },
            {
              title: "Rasi",
              value: nakshatraResult.data?.response.rasi || "Not Available",
            },
            {
              title: "Rasiathi",
              value: nakshatraResult.data?.response.rasiathi || "Not Available",
            },
            {
              title: "Vasya",
              value: nakshatraResult.data?.response.vasya || "Not Available",
            },
            {
              title: "Rajju",
              value: nakshatraResult.data?.response.rajju || "Not Available",
            },
            {
              title: "Vedha",
              value: nakshatraResult.data?.response.vedha || "Not Available",
            },
          ],
        },
      ],
    };

    // Send the formatted response
    res.status(200).json(response);
    return;
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while fetching match-making data.",
    });
    return;
  }
};