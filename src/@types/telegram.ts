export interface iTelegramChat {
  bot_info: BotInfo;
  message_id: number;
  from:       From;
  chat:       Chat;
  date:       number;
  text:       string;
  entities: Entity[];
}
export interface Chat {
  id:         number;
  first_name: string;
  username:   string;
  type:       string;
}
export interface Entity {
  offset: number;
  length: number;
  type:   string;
}
export interface From {
  id:            number;
  is_bot:        boolean;
  first_name:    string;
  username:      string;
  language_code: string;
}
export interface BotInfo {
  id:            number;
  client_id:     number;
  is_bot:        boolean;
  first_name:    string;
  username:      string;
  can_join_groups: boolean;
  can_read_all_group_messages: boolean;
  supports_inline_queries: boolean;
}