// Safety check that runs on every message BEFORE anything else (English + German).
// If it finds something, Chill Guy stops the normal conversation — these are never "reframed".

export type SafetyFlag =
  | 'selfHarm' // the person may hurt themselves
  | 'harmOthers' // the person talks about hurting someone
  | 'beingHarmed'; // someone is hurting, threatening or discriminating against the person

const selfHarm = [
  /\bkill(ing)? myself\b/,
  /\bsuicid/,
  /\bend (it all|my life|everything)\b/,
  /\bwant(ed)? to die\b/,
  /\bdon'?t want to (live|be alive|be here|exist)\b/,
  /\bno reason to live\b/,
  /\bbetter off without me\b/,
  /\b(hurt|hurting|cut|cutting|harm|harming) myself\b/,
  /\bself[- ]?harm/,
  // German
  /\bselbstmord\b/,
  /\bsuizid/,
  /\bmich (umbringen|töten)\b/,
  /\bnicht mehr leben\b/,
  /\bmich (selbst )?verletzen\b/,
  /\britzen\b/,
];

const harmOthers = [
  /\b(kill|murder|stab|shoot|strangle) (him|her|them|you|someone|somebody|my \w+|that \w+)\b/,
  /\b(hurt|hit|punch|beat|slap|kick|smash) (him|her|them|someone|somebody|my \w+|that \w+)\b/,
  /\bbeat (him|her|them) up\b/,
  /\bwant(ed)? to (hurt|hit|punch|kill)\b/,
  /\b(knife|gun|weapon)\b/,
  // German
  /\b(ihn|sie) (umbringen|schlagen|verletzen)\b/,
];

const beingHarmed = [
  /\b(hit|hits|punched|kicked|slapped|choked|shoved|threatened|threatens) me\b/,
  /\babus(e|ed|ive)\b/,
  /\bassault/,
  /\bharass/,
  /\bstalk/,
  /\bthreaten/,
  /\btouched me\b/,
  /\b(afraid|scared) of (him|her|them|my \w+)\b/,
  /\b(not safe|unsafe)\b/,
  /\bdiscriminat/,
  /\bracis[mt]/,
  /\bsexis[mt]/,
  /\bhomophob/,
  // German
  /\bschlägt mich\b/,
  /\bbedroht mich\b/,
];

const matches = (text: string, patterns: RegExp[]) => patterns.some((p) => p.test(text));

export function checkSafety(message: string): SafetyFlag | null {
  const text = message.toLowerCase();
  if (matches(text, selfHarm)) return 'selfHarm';
  if (matches(text, beingHarmed)) return 'beingHarmed';
  if (matches(text, harmOthers)) return 'harmOthers';
  return null;
}
