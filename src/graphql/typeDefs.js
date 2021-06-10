import { gql } from "apollo-server-express";
// Query fields must match up with resolvers, including arguments
export const typeDefs = gql`
  type Query {
    HVAC: [HVACTriggered!]!
    HeaterTriggeredDates: [HVACTriggered!]!
    ACTriggeredDates: [HVACTriggered!]!
  }
  type HVACTriggered {
    id: ID!
    Date: String
    Time: String
    Name: String
    Temperature: Float
    hasTriggeredAC: Boolean
    hasTriggeredHeater: Boolean
  }
  type DateExtremeTemperatures {
    id: ID!
    date: String!
    lowestTemperature: Float!
    highestTemperature: Float!
  }
`;
