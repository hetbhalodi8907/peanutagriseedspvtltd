/** Lets an email address wrap after the "@" rather than mid-word on narrow layouts. */
export function breakableEmail(value: string) {
  const at = value.indexOf("@");
  if (at === -1) return value;
  return (
    <>
      {value.slice(0, at + 1)}
      <wbr />
      {value.slice(at + 1)}
    </>
  );
}
