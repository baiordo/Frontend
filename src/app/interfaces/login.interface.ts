export interface AgentCred {
    agent_id: string;
    agent_avatar_url: string;
    agent_access: string;
    agent_refresh: string;
    agent_full_name: string;
    agent_role: string;
    agent_phone_number: string
}

export interface LoginResponse {
    user_id: string;
    avatar_url: string;
    full_name: string;
    user_role: string;
    access_token: string;
    refresh_token: string;
    phone_number: string;
}