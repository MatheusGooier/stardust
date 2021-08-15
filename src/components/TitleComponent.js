import React from "react";
import Helmet from "react-helmet";

const TitleComponent = ({ title }) => {
  var appName = "StarDust";
  return (
    <Helmet>
      <title>{title ? `${appName} - ${title}` : appName}</title>
    </Helmet>
  );
};

export { TitleComponent };
