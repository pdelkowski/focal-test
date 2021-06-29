const primaryGradientFirstColor = "#06A2FA";
const primaryGradientSecondColor = "#046CB7";
const bgGradientFirstColor = "#333940";
const bgGradientSecondColor = "#141519";

const theme = {
  palette: {
    bg: "#232429",
    primaryGradientFirstColor,
    primaryGradientSecondColor,
    primaryGradient: `linear-gradient(to bottom, ${primaryGradientFirstColor}, ${primaryGradientSecondColor})`,
    bgGradientFirstColor,
    bgGradientSecondColor,
    bgGradient: `linear-gradient(to bottom, ${bgGradientFirstColor}, ${bgGradientSecondColor})`,
    border: "#3e434d",
    black: "#000",
    white: "#fff",
    white2: "#d1d1d1",
    blue: "#00c4ff",
    blue2: "#01598b",
    blue3: "#06a2fa",
    blue4: "#00598c",
    grey: "#545455",
    grey2: "#7d8387",
    grey3: "#f1f1f3",
    grey4: "#707070",
    grey5: "#a3a6b4",
    grey6: "#5F6365",
    grey7:  "#cecfd0",
    green: "#00f7a1",
    orange: "#ffa700",
    yellow: "#ffe200",
    purple: "#7162ab",
    success: "#66bb6a",
    error: "#d60000",
  },
  text: {
    primary: "#fff",
    secondary: "#7d8387",
    disabled: "#68686c",
    editable: "#f5f6fa",
  },
  panelBoxShadow: "5px 5px 15px 0 rgba(0, 0, 0, 0.62);",
};

export default theme;
