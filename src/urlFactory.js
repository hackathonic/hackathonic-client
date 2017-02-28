const baseUrl = '/api/v1';

export function createHackathonURL(accessToken) {
  const url = `${baseUrl}/hackathon`;
  if (!accessToken) {
    return url;
  }
  return `${url}?access_token=${accessToken}`;
}
