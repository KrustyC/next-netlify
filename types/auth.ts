export type NetlifyUser = {
  user_metadata: { full_name: string };
  token: {
    access_token: string;
    expires_at: string;
    expires_in: string;
    refresh_token: string;
    token_type: string;
  };
};
