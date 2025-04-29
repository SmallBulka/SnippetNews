import NewsCard from "./components/NewsCard";

import React from "react";
import { IData_SnippetNews } from "./types";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import { BulbOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { BulbFilled } from "@ant-design/icons";

const App: React.FC = () => {
  // Моковые данные для демонстрации
  const newsData: IData_SnippetNews = {
    ID: 260855433,
    IT: "Mobile bankers left vulnerable: 47% of UK consumers manage finances on insecure smartphones",
    AB: "Mobile bankers left vulnerable: 47% of UK consumers manage finances on insecure smartphones August 2020 by Kaspersky New research has revealed that UK consumers carry out online banking on smartphones and devices that are potentially vulnerable to a security breach, despite making sure they keep their desktop or laptop computers safe. In a study commissioned by Kaspersky, nearly half (47%) of smartphone owners who use a banking app don’t protect their mobile device with antivirus or security sof...",
    URL: "https://www.globalsecuritymag.com/Mobile-bankers-left-vulnerable-47,20200819,101944.html",
    DP: "2025-03-06T21:00:00",
    DOM: "globalsecuritymag.com",
    SENT: "negative",
    LANG: "en",
    AU: ["Jane Smith"],
    FAV: "/favicons/e65d69dc71ab539384fcc63062efdd3d.png",
    KM: [
      {
        value: "antivirus",
        count: 10,
      },
      {
        value: "kaspersky",
        count: 5,
      },
      {
        value: "new",
        count: 1,
      },
    ],
    HIGHLIGHTS: [
      "…20 by <kw>Kaspersky</kw> <kw>New</kw> research has revealed that UK consumers carry out online banking on smartphones and devices that are potentially vulnerable to a security breach, despite making sure they keep their desktop or laptop computers safe. In a study commissioned by <kw>Kaspersky</kw>…",
      "…with <kw>antivirus</kw> or security software. More than half (52%) of UK smartphone owners who access bank accounts with their mobile device are worried about their banking app being hacked if their phone was lost or stolen. Despite that fear, 47%[2] are banking on devices without <kw>antivirus</kw>…",
      "…hone with <kw>antivirus</kw> protection. Surprisingly, one fifth (21%) of adults overall, and one third (33%) of Generation Z, believe their phone can’t be hacked, despite the level of mobile malware attacks rising over the past 12 months. Around two-in-five of those without <kw>antivirus</kw> and s…",
    ],
    REACH: 2392,
    CNTR: "France",
    CNTR_CODE: "fr",
    TRAFFIC: [
      {
        value: "India",
        count: 0.779,
      },
      {
        value: "United States of America",
        count: 0.101,
      },
      {
        value: "Mexico",
        count: 0.036,
      },
    ],
  };
  return (
    <ThemeProvider>
      <AppContent newsData={newsData} />
    </ThemeProvider>
  );
};

const AppContent: React.FC<{ newsData: IData_SnippetNews }> = ({
  newsData,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeProvider>
      <div
        className="app"
        style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
      >
        <div className="theme-toggle">
          <Switch
            style={{ marginBottom: "24px" }}
            checked={theme === "dark"}
            onChange={toggleTheme}
            checkedChildren={<BulbFilled />}
            unCheckedChildren={<BulbOutlined />}
          />
        </div>

        <NewsCard data={newsData} showDuplicates={true} />

        {/* Дополнительная новость для демонстрации */}

        <NewsCard
          data={{
            ...newsData,
            AU: ["John Doe"],
            ID: 2,
            IT: "InnovTech announces AutoPilot 5000 for autonomous vehicles",
            DOM: "TechNews.com",
            DP: "2024-06-20T14:45:00",
            REACH: 150000,
            LANG: "En",
            TRAFFIC: [
              { value: "USA", count: 95000 },
              { value: "Germany", count: 35000 },
              { value: "Japan", count: 20000 },
            ],
            HIGHLIGHTS: [
              "InnovTech has unveiled its latest autonomous driving system, the AutoPilot 5000, which uses cutting-edge AI to provide safer and more efficient transportation solutions. The system has already been tested in several major cities with impressive results.",
            ],
          }}
          showDuplicates={false}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
