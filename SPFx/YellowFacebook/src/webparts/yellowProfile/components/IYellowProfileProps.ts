import { HttpClient } from "@microsoft/sp-http";

export interface IYellowProfileProps {
  httpClient: HttpClient;
  userDisplayName: string;
}
