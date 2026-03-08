// Mapping of course Subject ID → Google Calendar ID for IITM BS Jan 2026 term.
// Calendar IDs are decoded from the public Google Calendar share links.
export const COURSE_CALENDAR_IDS: Partial<Record<string, string>> = {
  // Foundation
  CT:     'c_4uohcdlrfqd010amaomm03luso@group.calendar.google.com',
  ENG1:   'c_rviuu7v55mu79mq0im1smptg3o@group.calendar.google.com',
  MATHS1: 'c_e22g538fjf8lbekflkv0cg75ag@group.calendar.google.com',
  STATS1: 'c_p84m18r1paj8ccjlhdvtkj9sbk@group.calendar.google.com',
  PYTHON: 'c_mlu3fv687nhdstj68kpkocpolc@group.calendar.google.com',
  ENG2:   'c_3m3mn1qvfs2pmf7dp5csk6sjio@group.calendar.google.com',
  MATHS2: 'c_hfdjkkjf1e4lj72jc26mv0i354@group.calendar.google.com',
  STATS2: 'c_4cl17p1etna3gbbeivov0p5mko@group.calendar.google.com',
  // Diploma
  DBMS:    'c_cuc473hkudkleuec6svl6s4s1k@group.calendar.google.com',
  PDSA:    'c_l87hl0aeb08v7769n2bfb4puoo@group.calendar.google.com',
  MAD1:    'c_hm7bdlnk8teaod0rpd3ofkh4d8@group.calendar.google.com',
  MAD2:    'c_9bmp88q0bth17oknsdenanrljk@group.calendar.google.com',
  MLF:     'c_3g4ajd7pjbbot2ehfihv3pec5o@group.calendar.google.com',
  BA:      'c_q84cdihanljabbih6qgouv6nr8@group.calendar.google.com',
  BDM:     'c_quf79p2atoknt1thvov7gfrba0@group.calendar.google.com',
  JAVA:    'c_9rb2vi2s3hq1vph9pnhddidg88@group.calendar.google.com',
  MLP:     'c_50sjb29utstr52pd0d1uhsbphc@group.calendar.google.com',
  MLT:     'c_o885jgm15kn2sem5tid3k3r8g4@group.calendar.google.com',
  TDS:     'c_bof7ns1l7n6o8k05tp8a9q5b0g@group.calendar.google.com',
  SC:      'c_n02pjfuc6vnqvkamb363blnk98@group.calendar.google.com',
  DL_GENAI: 'c_8350e227c25e513af95945d5401a4ecfc439fb9be0ea9c20b83a0f26c02859b5@group.calendar.google.com',
  // Degree
  SE:          'c_56fu64oi6jlh272kj0gc4bm468@group.calendar.google.com',
  ST:          'c_vg45f9t4s5gukgctfl0d9tgd6s@group.calendar.google.com',
  AI_SM:       'c_hk07utisu0i5rki6tv4bjgepoo@group.calendar.google.com',
  DL:          'c_a9d90g6fr3rjkrhmp0t5gareak@group.calendar.google.com',
  SPG:         'c_9hbn9o7kru47pt92oc1oc2u2ig@group.calendar.google.com',
  INDUSTRY4:   'c_361b71286a02b332887bf7dfe83e762190c8b98a4faa20786bbecb24cbbc8230@group.calendar.google.com',
  SPEECH_TECH: 'c_jdh7pg0uubontcu8s6sg6k4n78@group.calendar.google.com',
  BIOINFO:     'c_0650a03275b27d954e4cf85353cb33156a6b82afb757333959c6b51f2433aeab@group.calendar.google.com',
  OS:          'c_410752174d40d703caad18835d58f1331abaa0bfd494575f517200f2b1add284@group.calendar.google.com',
  MKT_RES:     'c_55cd8aa80ba5bfbd9c7bd3a4b2a9d3b98af701c273dd0631143c6259dc97c4a6@group.calendar.google.com',
  BIG_DATA:    'c_5bf0bd63ba8024d48d4ac95b4ef800dc8dcc1c767bfa25159cd0873e22a24b63@group.calendar.google.com',
  BIO_NET:     'c_545019bb92da732afb9606b27356be5650b19993cf05942168e02699f105c1a9@group.calendar.google.com',
  C_PROG:      'c_03d9a34ab6f680ace01fc905a93163d42fa12339830d2fe71432d0e52987f128@group.calendar.google.com',
};

/** Returns the Google Calendar subscribe URL for a course */
export function getSubscribeUrl(courseId: string): string | null {
  const calId = COURSE_CALENDAR_IDS[courseId];
  if (!calId) return null;
  return `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(calId)}`;
}
