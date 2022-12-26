const Base = 4;
enum FONT_FAMILY {
  REGULAR = "Poppins-Regular",
  LIGHT = "Poppins-Light",
  MEDIUM = "Poppins-Medium",
  BOLD = "Poppins-Bold",
}

export const StyleConstants = {
  Font: {
    Regular: { fontFamily: FONT_FAMILY.REGULAR },
    Light: { fontFamily: FONT_FAMILY.LIGHT },
    Medium: { fontFamily: FONT_FAMILY.MEDIUM },
    Bold: { fontFamily: FONT_FAMILY.BOLD },
  },
  FontStyle: {
    XS: { fontSize: 12, lineHeight: 18 },
    S: { fontSize: 14, lineHeight: 20 },
    M: { fontSize: 16, lineHeight: 22 },
    L: { fontSize: 18, lineHeight: 28 },
    XL: { fontSize: 20, lineHeight: 30 },
  },

  Spacing: {
    XS: Base,
    S: Base * 2,
    M: Base * 4,
    L: Base * 6,
    XL: Base * 10,
    Global: { PagePadding: Base * 4 },
  },

  Avatar: { XS: 32, S: 40, M: 48, L: 96 },
};
