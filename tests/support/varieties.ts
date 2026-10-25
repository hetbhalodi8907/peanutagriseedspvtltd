/**
 * The verified catalogue: official order, exact names, slugs and the SHA-256 of each
 * packaging file. Every mapping was checked by reading the name printed on the package
 * (Phase 4 and Phase 9, see docs/IMAGE-CREDITS.md). Update this list only together with
 * src/content/seeds.ts and a fresh check of the printed name.
 */
export type Variety = { slug: string; name: string; sha256: string };

export const VARIETIES: Variety[] = [
  { slug: "g20", name: "G20", sha256: "0d6f8c3bfe45a9c471006d55d0eef90636c3aeadf9be55a087460e50e3670934" },
  { slug: "g22", name: "G22", sha256: "3fdd56ff17db5aad25548b833ecbad69243ef8604f887c8feabbe27d03a683c2" },
  { slug: "tj-37", name: "TJ-37", sha256: "ba3760f211cdb7eccf6166a4c7ef092aff11c3c5a07d90c810f715edfb9a2398" },
  { slug: "tj-38", name: "TJ-38", sha256: "adbb2953205dcaa20391bd4c04e1179fe9ff4a1b9ce5627b5c7b2bc07ea5d9cb" },
  { slug: "girnar-4", name: "GIRNAR-4", sha256: "898df282eca24d3fafb2b40b406a89bcd8b46b4c9ec4fe293e6c20de2e7c2ccf" },
  { slug: "girnar-5", name: "GIRNAR-5", sha256: "5c129ccb99fa0a32969c80ea2279d64abce6a6c8b3af4b1233eb167e4e281ebd" },
  { slug: "menakshi", name: "MENAKSHI", sha256: "b5aeace288cd34b37d3e34472898417b35d418476f05b7116321617953d410b9" },
  { slug: "red-cherry", name: "RED CHERRY", sha256: "5e28f351d6e45fee381b91353fcd5afcafbfb2dbd2c51d3f47cfe78ce5edeaa6" },
  { slug: "sona", name: "SONA", sha256: "c2cba8388ddc0849b83afb5292253bd14bf8b10af7e7f12f559446579ec59945" },
  { slug: "vardan", name: "VARDAN", sha256: "dc76fd445a2eb409410f7222d4b306ccfde7170878e31d9264e64dc0c0401a3e" },
  { slug: "peanut-agri-seeds-special", name: "PEANUT AGRI SEEDS SPECIAL", sha256: "54ef7b30ebbffca4b30579cf72da43d94de3aa7aad03366c035b0b168c51fb3e" },
  { slug: "g23", name: "G23", sha256: "79bff4003281c5e8b6dae931ba6bc006b7744f7226061968143444686cd27f5a" },
  { slug: "g45", name: "G45", sha256: "602abb2fcbc54fbcddd8731073e0b6d9c3fbc6cda449e16339d41540dd0fda3a" },
  { slug: "g10", name: "G10", sha256: "6314c5c943bfb603aba94f5e2a90ce4252cf878b67dca55b78e2b7fa96ca627c" },
  { slug: "no-39", name: "NO-39", sha256: "e4b198733399a1346695bae47edd82c9c13b0eb236e518ef76c3c325e96686c2" },
  { slug: "t-9", name: "T-9", sha256: "ab38d546cf7038d31d54dbb99a976384b67ef184b7e9e9f4f050959ddc530a6d" },
  { slug: "g41", name: "G41", sha256: "1fc973ee759cf2503649fcad6f47a4d59844c8d3162383ae5cd17393b8233233" },
  { slug: "sweta", name: "SWETA", sha256: "a14764f66f0b86d175a7c69861b3b65c552be87db60ec1b12124e73eaf24bda9" },
  { slug: "sundri", name: "SUNDRI", sha256: "88c2c02e830f4727a9178871b4eecc46babf8f55fd3b16fc917ec3bc44c4fbbd" },
  { slug: "no-28", name: "NO-28", sha256: "ae98440fa1b03b5d81cecea3451b33e908833679f4404dd69b6c72b718b1a806" },
  { slug: "no-32", name: "NO-32", sha256: "79fa26534fab214eacd7079369566dad0ecd7708316af477d3ac6524e82a3c66" },
  { slug: "441", name: "441", sha256: "841946a67f3881076883fed80965ce4aec39baa80d9ecfdbe3f810ef94090015" },
  { slug: "no-9", name: "NO-9", sha256: "b09fced541d0b336cc58ff4219b30df766025122890b8cfea4fe684586873ce2" },
  { slug: "no-66", name: "NO-66", sha256: "81eec041e7cf11efa028185d5f1dce4560cd8ab328670c6d01b6e0823ad40e0b" },
  { slug: "rembo", name: "REMBO", sha256: "a553903f80cadb8e26559c7143c9904b08c891cc3ba92d9ae18d4d7d99aafa44" },
];

export const bySlug = (slug: string) => {
  const variety = VARIETIES.find((v) => v.slug === slug);
  if (!variety) throw new Error(`Unknown variety ${slug}`);
  return variety;
};
