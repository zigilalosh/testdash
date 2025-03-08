// Amazon AWS Dashboard for GitHub Pages
// Uses the global React, ReactDOM, and Recharts objects loaded from CDN

(function() {
  // Destructure React components
  const React = window.React;
  const { useState } = React;
  const ReactDOM = window.ReactDOM;
  
  // Destructure Recharts components
  const {
    LineChart, Line, BarChart, Bar, PieChart, Pie, ComposedChart, Area, Cell, AreaChart,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, LabelList
  } = window.Recharts;
  
  // Dataset based on analyzed financial data
  const amazonData = {
    // Overall Amazon data by year (in billions USD)
    overall: [
      { year: 2016, revenue: 136, netProfit: 2.4, awsRevenue: 12.2, awsOperatingIncome: 3.1, otherRevenue: 123.8, amazonOperatingIncome: 6.8, awsOperatingIncomePercentage: 45.5, standaloneAwsValuation: 122, amazonMarketCap: 340, awsPercentageOfValue: 35.9, awsRevenueGrowth: 0, amazonRevenueGrowth: 0 },
      { year: 2017, revenue: 178, netProfit: 3.0, awsRevenue: 17.5, awsOperatingIncome: 4.3, otherRevenue: 160.5, amazonOperatingIncome: 9.1, awsOperatingIncomePercentage: 47.2, standaloneAwsValuation: 175, amazonMarketCap: 445, awsPercentageOfValue: 39.3, awsRevenueGrowth: 43.4, amazonRevenueGrowth: 30.9 },
      { year: 2018, revenue: 233, netProfit: 10.1, awsRevenue: 25.7, awsOperatingIncome: 7.3, otherRevenue: 207.3, amazonOperatingIncome: 13.5, awsOperatingIncomePercentage: 54.0, standaloneAwsValuation: 257, amazonMarketCap: 582.5, awsPercentageOfValue: 44.1, awsRevenueGrowth: 46.9, amazonRevenueGrowth: 30.9 },
      { year: 2019, revenue: 281, netProfit: 11.6, awsRevenue: 35.0, awsOperatingIncome: 9.2, otherRevenue: 246.0, amazonOperatingIncome: 16.6, awsOperatingIncomePercentage: 55.5, standaloneAwsValuation: 350, amazonMarketCap: 702.5, awsPercentageOfValue: 49.8, awsRevenueGrowth: 36.2, amazonRevenueGrowth: 20.6 },
      { year: 2020, revenue: 386, netProfit: 21.3, awsRevenue: 45.4, awsOperatingIncome: 13.5, otherRevenue: 340.6, amazonOperatingIncome: 23.7, awsOperatingIncomePercentage: 56.9, standaloneAwsValuation: 454, amazonMarketCap: 965, awsPercentageOfValue: 47.0, awsRevenueGrowth: 29.7, amazonRevenueGrowth: 37.4 },
      { year: 2021, revenue: 470, netProfit: 33.4, awsRevenue: 62.2, awsOperatingIncome: 18.5, otherRevenue: 407.8, amazonOperatingIncome: 30.7, awsOperatingIncomePercentage: 60.2, standaloneAwsValuation: 622, amazonMarketCap: 1175, awsPercentageOfValue: 52.9, awsRevenueGrowth: 37.0, amazonRevenueGrowth: 21.8 },
      { year: 2022, revenue: 514, netProfit: -2.7, awsRevenue: 80.1, awsOperatingIncome: 22.8, otherRevenue: 433.9, amazonOperatingIncome: 35.8, awsOperatingIncomePercentage: 63.7, standaloneAwsValuation: 801, amazonMarketCap: 1285, awsPercentageOfValue: 62.3, awsRevenueGrowth: 28.8, amazonRevenueGrowth: 9.4 },
      { year: 2023, revenue: 575, netProfit: 30.4, awsRevenue: 90.8, awsOperatingIncome: 26.4, otherRevenue: 484.2, amazonOperatingIncome: 40.9, awsOperatingIncomePercentage: 64.5, standaloneAwsValuation: 908, amazonMarketCap: 1437.5, awsPercentageOfValue: 63.2, awsRevenueGrowth: 13.4, amazonRevenueGrowth: 11.9 },
      { year: 2024, revenue: 631, netProfit: 40.2, awsRevenue: 100.5, awsOperatingIncome: 30.1, otherRevenue: 530.5, amazonOperatingIncome: 46.0, awsOperatingIncomePercentage: 65.4, standaloneAwsValuation: 1005, amazonMarketCap: 1577.5, awsPercentageOfValue: 63.7, awsRevenueGrowth: 10.7, amazonRevenueGrowth: 9.7 }
    ],
    
    // AWS service breakdown for recent year
    awsBreakdown: [
      { service: "EC2 & Compute", percentage: 38, value: 38.2 },
      { service: "S3 & Storage", percentage: 18, value: 18.1 },
      { service: "Database Services", percentage: 12, value: 12.1 },
      { service: "Networking", percentage: 8, value: 8.0 },
      { service: "ML & AI Services", percentage: 7, value: 7.0 },
      { service: "Identity & Security", percentage: 6, value: 6.0 },
      { service: "Analytics", percentage: 5, value: 5.0 },
      { service: "Management Tools", percentage: 3, value: 3.0 },
      { service: "Other Services", percentage: 3, value: 3.1 }
    ],
    
    // AWS quarterly data
    awsQuarterly: [
      { quarter: "Q1 2023", revenue: 21.4, growth: 16 },
      { quarter: "Q2 2023", revenue: 22.1, growth: 12 },
      { quarter: "Q3 2023", revenue: 23.1, growth: 12 },
      { quarter: "Q4 2023", revenue: 24.2, growth: 13 },
      { quarter: "Q1 2024", revenue: 25.0, growth: 17 },
      { quarter: "Q2 2024", revenue: 25.7, growth: 16 },
      { quarter: "Q3 2024", revenue: 26.3, growth: 14 },
      { quarter: "Q4 2024", revenue: 23.5, growth: -3 }
    ],
    
    // AWS geographical distribution
    awsGeography: [
      { region: "North America", percentage: 52, fill: "#0088FE" },
      { region: "Europe", percentage: 23, fill: "#00C49F" },
      { region: "Asia Pacific", percentage: 18, fill: "#FFBB28" },
      { region: "South America", percentage: 4, fill: "#FF8042" },
      { region: "Middle East & Africa", percentage: 3, fill: "#A569BD" }
    ]
  };

  // Main Dashboard Component
  const AmazonDashboard = () => {
    const [activeTab, setActiveTab] = React.useState('overview');
    
    // Latest metrics for cards
    const latestYear = amazonData.overall[amazonData.overall.length-1];
    const prevYear = amazonData.overall[amazonData.overall.length-2];
    const firstYear = amazonData.overall[0];
    const years = latestYear.year - firstYear.year;
    const awsCAGR = parseFloat((Math.pow(latestYear.awsRevenue / firstYear.awsRevenue, 1/years) - 1) * 100).toFixed(1);
    const revenueGrowth = parseFloat(((latestYear.revenue - prevYear.revenue) / prevYear.revenue * 100).toFixed(1));
    const awsGrowth = parseFloat(((latestYear.awsRevenue - prevYear.awsRevenue) / prevYear.awsRevenue * 100).toFixed(1));
    const netProfitGrowth = prevYear.netProfit > 0 ? 
      parseFloat(((latestYear.netProfit - prevYear.netProfit) / prevYear.netProfit * 100).toFixed(1)) : 100;

    // Custom colors
    const COLORS = ['#FF9900', '#232F3E', '#146EB4', '#01A4B4', '#C45500'];
    
    // Format numbers for display
    const formatBillions = (value) => `$${value}B`;
    const formatPercentage = (value) => `${value}%`;

    // Build metric cards
    const MetricCard = ({ title, value, subtitle, change, upIsGood }) => {
      const isPositive = change > 0;
      const changeDisplay = Math.abs(change).toFixed(1);
      const changeColor = upIsGood ? (isPositive ? 'text-green-600' : 'text-red-600') : 
                                      (isPositive ? 'text-red-600' : 'text-green-600');
      
      return (
        React.createElement("div", { className: "bg-white rounded-lg shadow p-4 flex flex-col" },
          React.createElement("div", { className: "flex justify-between items-center mb-2" },
            React.createElement("h3", { className: "text-gray-500 text-sm font-medium" }, title)
          ),
          React.createElement("div", { className: "flex items-end mt-2" },
            React.createElement("p", { className: "text-2xl font-bold" }, value),
            change !== undefined && 
              React.createElement("div", { className: `flex items-center ml-2 ${changeColor}` },
                React.createElement("span", { className: "text-sm font-medium" }, 
                  `${isPositive ? "↑" : "↓"} ${changeDisplay}%`
                )
              )
          ),
          subtitle && React.createElement("p", { className: "text-xs text-gray-500 mt-1" }, subtitle)
        )
      );
    };

    // Custom tooltip for charts
    const CustomTooltip = ({ active, payload, label, valuePrefix = '', valueSuffix = '' }) => {
      if (active && payload && payload.length) {
        return (
          React.createElement("div", { className: "bg-white p-4 border border-gray-200 shadow-lg rounded" },
            React.createElement("p", { className: "font-bold" }, label),
            payload.map((entry, index) => (
              React.createElement("p", { 
                key: index, 
                style: { color: entry.color || entry.fill }
              },
                `${entry.name}: ${valuePrefix}${entry.value.toFixed(1)}${valueSuffix}`
              )
            ))
          )
        );
      }
      return null;
    };

    return (
      React.createElement("div", { className: "bg-gray-50 p-6 font-sans" },
        React.createElement("div", { className: "mb-6" },
          React.createElement("h1", { className: "text-3xl font-bold text-gray-800" }, "Amazon Financial Performance Dashboard"),
          React.createElement("p", { className: "text-gray-600" }, "Detailed analysis of Amazon's revenue, profits, and AWS contributions")
        ),
        
        // Tabs
        React.createElement("div", { className: "flex border-b border-gray-200 mb-6" },
          React.createElement("button", { 
            className: `px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`,
            onClick: () => setActiveTab('overview')
          }, "Overview"),
          React.createElement("button", { 
            className: `px-4 py-2 font-medium ${activeTab === 'aws' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`,
            onClick: () => setActiveTab('aws')
          }, "AWS Deep Dive")
        ),
        
        // Overview Tab
        activeTab === 'overview' && 
          React.createElement("div", { className: "space-y-6" },
            // Key Metrics
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" },
              React.createElement(MetricCard, { 
                title: "Total Revenue (2024)", 
                value: formatBillions(latestYear.revenue),
                subtitle: "Amazon's consolidated revenue",
                change: revenueGrowth,
                upIsGood: true
              }),
              React.createElement(MetricCard, { 
                title: "Net Profit (2024)", 
                value: formatBillions(latestYear.netProfit),
                subtitle: "Company-wide net profit",
                change: netProfitGrowth,
                upIsGood: true
              }),
              React.createElement(MetricCard, { 
                title: "AWS Revenue (2024)", 
                value: formatBillions(latestYear.awsRevenue),
                subtitle: `${(latestYear.awsRevenue / latestYear.revenue * 100).toFixed(1)}% of total revenue`,
                change: awsGrowth,
                upIsGood: true
              }),
              React.createElement(MetricCard, { 
                title: "AWS Operating Income", 
                value: formatBillions(latestYear.awsOperatingIncome),
                subtitle: `${(latestYear.awsOperatingIncome / latestYear.awsRevenue * 100).toFixed(1)}% operating margin`
              })
            ),
            
            // Historical Data Table
            React.createElement("div", { className: "bg-white p-6 rounded-lg shadow overflow-x-auto" },
              React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Amazon & AWS Historical Performance (2016-2024)"),
              React.createElement("table", { className: "min-w-full bg-white border border-gray-200" },
                React.createElement("thead", { className: "bg-gray-100" },
                  React.createElement("tr", null,
                    React.createElement("th", { className: "py-3 px-4 text-left font-medium text-gray-700 border-b border-gray-200" }, "Metric"),
                    amazonData.overall.map(yearData => (
                      React.createElement("th", { 
                        key: yearData.year, 
                        className: "py-3 px-4 text-center font-medium text-gray-700 border-b border-gray-200"
                      }, yearData.year)
                    ))
                  )
                ),
                React.createElement("tbody", null,
                  React.createElement("tr", { className: "hover:bg-gray-50" },
                    React.createElement("td", { className: "py-3 px-4 border-b border-gray-200 font-medium" }, "Amazon Total Revenue"),
                    amazonData.overall.map(yearData => (
                      React.createElement("td", { 
                        key: yearData.year, 
                        className: "py-3 px-4 text-center border-b border-gray-200"
                      }, `$${yearData.revenue.toFixed(1)}B`)
                    ))
                  ),
                  React.createElement("tr", { className: "hover:bg-gray-50 bg-gray-50" },
                    React.createElement("td", { className: "py-3 px-4 border-b border-gray-200 font-medium" }, "AWS Revenue"),
                    amazonData.overall.map(yearData => (
                      React.createElement("td", { 
                        key: yearData.year, 
                        className: "py-3 px-4 text-center border-b border-gray-200"
                      }, `$${yearData.awsRevenue.toFixed(1)}B`)
                    ))
                  ),
                  React.createElement("tr", { className: "hover:bg-gray-50" },
                    React.createElement("td", { className: "py-3 px-4 border-b border-gray-200 font-medium" }, "Amazon Operating Income"),
                    amazonData.overall.map(yearData => (
                      React.createElement("td", { 
                        key: yearData.year, 
                        className: "py-3 px-4 text-center border-b border-gray-200"
                      }, `$${yearData.amazonOperatingIncome.toFixed(1)}B`)
                    ))
                  ),
                  React.createElement("tr", { className: "hover:bg-gray-50 bg-gray-50" },
                    React.createElement("td", { className: "py-3 px-4 border-b border-gray-200 font-medium" }, "AWS Operating Income"),
                    amazonData.overall.map(yearData => (
                      React.createElement("td", { 
                        key: yearData.year, 
                        className: "py-3 px-4 text-center border-b border-gray-200"
                      }, `$${yearData.awsOperatingIncome.toFixed(1)}B`)
                    ))
                  ),
                  React.createElement("tr", { className: "hover:bg-gray-50" },
                    React.createElement("td", { className: "py-3 px-4 border-b border-gray-200 font-medium" }, "AWS % of Operating Income"),
                    amazonData.overall.map(yearData => (
                      React.createElement("td", { 
                        key: yearData.year, 
                        className: "py-3 px-4 text-center border-b border-gray-200"
                      }, `${yearData.awsOperatingIncomePercentage}%`)
                    ))
                  )
                )
              )
            ),
            
            // Revenue and Profit Bar Chart
            React.createElement("div", { className: "bg-white p-6 rounded-lg shadow" },
              React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Amazon & AWS Detailed Performance (2016-2024)"),
              React.createElement("div", { className: "h-96" },
                React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
                  React.createElement(BarChart, {
                    data: amazonData.overall,
                    margin: { top: 20, right: 30, left: 20, bottom: 20 },
                    barSize: 40
                  },
                    React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
                    React.createElement(XAxis, { dataKey: "year" }),
                    React.createElement(YAxis, { domain: [0, 700] },
                      React.createElement(Label, { 
                        angle: -90, 
                        value: "Billions USD", 
                        position: "insideLeft", 
                        style: { textAnchor: 'middle' } 
                      })
                    ),
                    React.createElement(Tooltip, { content: React.createElement(CustomTooltip, { valuePrefix: "$", valueSuffix: "B" }) }),
                    React.createElement(Legend),
                    React.createElement(Bar, { dataKey: "revenue", name: "Amazon Total Revenue", stackId: "a", fill: "#FF9900" }),
                    React.createElement(Bar, { dataKey: "awsRevenue", name: "AWS Revenue", stackId: "b", fill: "#232F3E" }),
                    React.createElement(Bar, { dataKey: "amazonOperatingIncome", name: "Amazon Operating Income", stackId: "c", fill: "#146EB4" }),
                    React.createElement(Bar, { dataKey: "awsOperatingIncome", name: "AWS Operating Income", stackId: "d", fill: "#01A4B4" })
                  )
                )
              )
            ),
            
            // Surprise Chart: AWS as a Standalone Company
            React.createElement("div", { className: "bg-white p-6 rounded-lg shadow" },
              React.createElement("h2", { className: "text-xl font-bold mb-4" }, "What if AWS Was a Separate Company?"),
              React.createElement("div", { className: "h-80" },
                React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
                  React.createElement(ComposedChart, {
                    data: amazonData.overall,
                    margin: { top: 20, right: 30, left: 20, bottom: 5 }
                  },
                    React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
                    React.createElement(XAxis, { dataKey: "year" }),
                    React.createElement(YAxis, { 
                      yAxisId: "left", 
                      orientation: "left", 
                      stroke: "#FF9900", 
                      domain: [0, 1800] 
                    },
                      React.createElement(Label, { 
                        angle: -90, 
                        value: "Valuation (Billions USD)", 
                        position: "insideLeft", 
                        style: { textAnchor: 'middle' } 
                      })
                    ),
                    React.createElement(YAxis, { 
                      yAxisId: "right", 
                      orientation: "right", 
                      stroke: "#146EB4", 
                      domain: [0, 100] 
                    },
                      React.createElement(Label, { 
                        angle: 90, 
                        value: "Percentage of Value (%)", 
                        position: "insideRight", 
                        style: { textAnchor: 'middle' } 
                      })
                    ),
                    React.createElement(Tooltip, { content: React.createElement(CustomTooltip, { valuePrefix: "$", valueSuffix: "B" }) }),
                    React.createElement(Legend),
                    React.createElement(Bar, { 
                      yAxisId: "left", 
                      dataKey: "standaloneAwsValuation", 
                      name: "Estimated AWS Standalone Value", 
                      fill: "#232F3E" 
                    }),
                    React.createElement(Bar, { 
                      yAxisId: "left", 
                      dataKey: "amazonMarketCap", 
                      name: "Estimated Amazon Market Cap", 
                      stackId: "a", 
                      fill: "#FF9900" 
                    }),
                    React.createElement(Line, { 
                      yAxisId: "right", 
                      type: "monotone", 
                      dataKey: "awsPercentageOfValue", 
                      name: "AWS % of Amazon's Value", 
                      stroke: "#146EB4", 
                      strokeWidth: 3, 
                      dot: { r: 5 } 
                    })
                  )
                )
              ),
              React.createElement("p", { className: "text-sm text-gray-600 mt-3" },
                "This chart estimates what AWS might be worth as a standalone cloud company, based on revenue multiples typical of cloud businesses. The line shows AWS's estimated value as a percentage of Amazon's total value, highlighting AWS's growing importance to Amazon's overall valuation."
              )
            )
          ),
        
        // AWS Deep Dive Tab
        activeTab === 'aws' && 
          React.createElement("div", { className: "space-y-6" },
            // AWS Key Metrics
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" },
              React.createElement(MetricCard, { 
                title: "AWS Revenue CAGR", 
                value: `${awsCAGR}%`,
                subtitle: `Compound annual growth rate (2016-2024)`
              }),
              React.createElement(MetricCard, { 
                title: "AWS Operating Margin", 
                value: `${(latestYear.awsOperatingIncome / latestYear.awsRevenue * 100).toFixed(1)}%`,
                subtitle: "Profit margin on AWS services",
                change: parseFloat((latestYear.awsOperatingIncome / latestYear.awsRevenue * 100).toFixed(1)) - 
                        parseFloat((prevYear.awsOperatingIncome / prevYear.awsRevenue * 100).toFixed(1)),
                upIsGood: true
              }),
              React.createElement(MetricCard, { 
                title: "Latest Quarter Growth", 
                value: `${amazonData.awsQuarterly[amazonData.awsQuarterly.length-1].growth}%`,
                subtitle: "Year-over-year quarterly growth",
                change: amazonData.awsQuarterly[amazonData.awsQuarterly.length-1].growth,
                upIsGood: true
              }),
              React.createElement(MetricCard, { 
                title: "AWS % of Operating Income", 
                value: `${latestYear.awsOperatingIncomePercentage}%`,
                subtitle: "AWS contribution to operating income"
              })
            ),
            
            // AWS Service Breakdown and Geographic Distribution
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
              // AWS Service Breakdown
              React.createElement("div", { className: "bg-white p-6 rounded-lg shadow" },
                React.createElement("h2", { className: "text-xl font-bold mb-4" }, "AWS Service Breakdown (2024)"),
                React.createElement("div", { className: "h-80" },
                  React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
                    React.createElement(PieChart, null,
                      React.createElement(Pie, {
                        data: amazonData.awsBreakdown,
                        cx: "50%",
                        cy: "50%",
                        labelLine: true,
                        outerRadius: 100,
                        fill: "#8884d8",
                        dataKey: "value",
                        nameKey: "service",
                        label: ({ service, percentage }) => `${service}: ${percentage}%`
                      },
                        amazonData.awsBreakdown.map((entry, index) => (
                          React.createElement(Cell, { 
                            key: `cell-${index}`, 
                            fill: COLORS[index % COLORS.length] 
                          })
                        ))
                      ),
                      React.createElement(Tooltip, { content: React.createElement(CustomTooltip, { valueSuffix: "%" }) }),
                      React.createElement(Legend, { layout: "vertical", verticalAlign: "middle", align: "right" })
                    )
                  )
                )
              ),
              
              // AWS Geographic Distribution
              React.createElement("div", { className: "bg-white p-6 rounded-lg shadow" },
                React.createElement("h2", { className: "text-xl font-bold mb-4" }, "AWS Geographic Distribution"),
                React.createElement("div", { className: "h-80" },
                  React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
                    React.createElement(PieChart, null,
                      React.createElement(Pie, {
                        data: amazonData.awsGeography,
                        cx: "50%",
                        cy: "50%",
                        labelLine: true,
                        outerRadius: 100,
                        fill: "#8884d8",
                        dataKey: "percentage",
                        nameKey: "region"
                      },
                        amazonData.awsGeography.map((entry, index) => (
                          React.createElement(Cell, { 
                            key: `cell-${index}`, 
                            fill: entry.fill 
                          })
                        )),
                        React.createElement(LabelList, { 
                          dataKey: "percentage", 
                          position: "outside", 
                          formatter: (value) => `${value}%` 
                        })
                      ),
                      React.createElement(Tooltip, { content: React.createElement(CustomTooltip, { valueSuffix: "%" }) }),
                      React.createElement(Legend)
                    )
                  )
                )
              )
            ),
            
            // AWS Quarterly Performance
            React.createElement("div", { className: "bg-white p-6 rounded-lg shadow" },
              React.createElement("h2", { className: "text-xl font-bold mb-4" }, "AWS Quarterly Performance (2023-2024)"),
              React.createElement("div", { className: "h-80" },
                React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
                  React.createElement(ComposedChart, {
                    data: amazonData.awsQuarterly,
                    margin: { top: 20, right: 30, left: 20, bottom: 5 }
                  },
                    React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
                    React.createElement(XAxis, { dataKey: "quarter" }),
                    React.createElement(YAxis, { 
                      yAxisId: "left", 
                      orientation: "left", 
                      stroke: "#FF9900" 
                    },
                      React.createElement(Label, { 
                        angle: -90, 
                        value: "Revenue (Billions USD)", 
                        position: "insideLeft", 
                        style: { textAnchor: 'middle' } 
                      })
                    ),
                    React.createElement(YAxis, { 
                      yAxisId: "right", 
                      orientation: "right", 
                      stroke: "#146EB4", 
                      domain: [-10, 25] 
                    },
                      React.createElement(Label, { 
                        angle: 90, 
                        value: "Growth Rate (%)", 
                        position: "insideRight", 
                        style: { textAnchor: 'middle' } 
                      })
                    ),
                    React.createElement(Tooltip, { content: React.createElement(CustomTooltip) }),
                    React.createElement(Legend),
                    React.createElement(Bar, {

  // Render the dashboard to the root element
  document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      React.createElement(AmazonDashboard),
      document.getElementById('root')
    );
  });
})(); // Close the self-invoking function
