import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { GetCategoryViseAthlete } from '../Apis/Common';
import { Box } from '@mui/material';

const PieChartComponent = () => {
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetCategoryViseAthlete();
                console.log("Fetched data:", data); // Log fetched data
                setCategoryData(data);
                console.log(categoryData)
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        };

        fetchData();
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#5a6bea', '#25abd8', '#913afb'];
    console.log("categoryData:", categoryData);

    return (
        <Box style={{}}>
            {categoryData.length > 0 ? (
                <PieChart width={500} height={470}>
                    <Pie
                        data={categoryData}
                        cx={250} // Center x-coordinate in the larger PieChart
                        cy={190} // Center y-coordinate in the larger PieChart
                        labelLine={false}
                        outerRadius={180} // Increased outer radius
                        fill="#8884d8"
                        dataKey="totalAthletes"
                        nameKey="categoryName"
                    >
                        {
                            categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`}
                                    // fill={`#${Math.floor(Math.random()*16777215).toString(16)}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))
                        }
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            ) : (
                <div>Loading...</div>
            )}
        </Box>
    );
}

export default PieChartComponent