/**
 * Whether [[placeholder]] facts are flagged on the page (dashed underline,
 * a "verify before launch" tooltip and the counter pill). A review aid for
 * development only: production shows them as ordinary text unless
 * NEXT_PUBLIC_SHOW_PLACEHOLDERS=true is set for that build.
 */
export const showPlaceholders =
  process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true" ||
  (process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "false" && process.env.NODE_ENV !== "production");

export const placeholderTitle = showPlaceholders ? "Placeholder: verify before launch" : undefined;
