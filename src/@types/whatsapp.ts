export interface iWhatsAppChat {
  _data:           Data;
  id:              ID;
  ack:             number;
  hasMedia:        boolean;
  body:            string;
  type:            string;
  timestamp:       number;
  from:            string;
  to:              string;
  deviceType:      string;
  isForwarded:     boolean;
  forwardingScore: number;
  isStatus:        boolean;
  isStarred:       boolean;
  broadcast:       boolean;
  fromMe:          boolean;
  hasQuotedMsg:    boolean;
  vCards:          any[];
  mentionedIds:    any[];
  isGif:           boolean;
  isEphemeral:     boolean;
  links:           any[];
}
export interface ID {
  fromMe:      boolean;
  remote:      string;
  id:          string;
  _serialized: string;
}
// not used
export interface Data {
  id:                          ID;
  body:                        string;
  type:                        string;
  t:                           number;
  notifyName:                  string;
  from:                        string;
  to:                          string;
  self:                        string;
  ack:                         number;
  isNewMsg:                    boolean;
  star:                        boolean;
  kicNotified:                 boolean;
  recvFresh:                   boolean;
  isFromTemplate:              boolean;
  pollInvalidated:             boolean;
  isSentCagPollCreation:       boolean;
  latestEditMsgKey:            null;
  latestEditSenderTimestampMs: null;
  broadcast:                   boolean;
  mentionedJidList:            any[];
  groupMentions:               any[];
  isVcardOverMmsDocument:      boolean;
  isForwarded:                 boolean;
  hasReaction:                 boolean;
  productHeaderImageRejected:  boolean;
  lastPlaybackProgress:        number;
  isDynamicReplyButtonsMsg:    boolean;
  isMdHistoryMsg:              boolean;
  stickerSentTs:               number;
  isAvatar:                    boolean;
  requiresDirectConnection:    boolean;
  isEphemeral:                 boolean;
  isStatusV3:                  boolean;
  links:                       any[];
}


