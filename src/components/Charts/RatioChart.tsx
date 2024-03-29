import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";



const RatioChart = ({ data }: any) => (
	<ResponsiveContainer width="100%" height={400}>
		<BarChart
			width={500}
			height={300}
			data={data}
			margin={{
				top: 5,
				right: 30,
				left: 20,
				bottom: 5
			}}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="rejected" fill="#FF474C" opacity={"0.5"} />
			<Bar dataKey="hired" fill="#82ca9d" />
		</BarChart>
	</ResponsiveContainer>
);

export default RatioChart;