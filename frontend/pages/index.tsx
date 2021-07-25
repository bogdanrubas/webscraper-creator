import React, { useEffect } from "react";
import { useRouter } from 'next/router';

interface IndexProps {}

const Index: React.FunctionComponent<IndexProps> = () => {
	const router = useRouter();

	useEffect(() => {
		router.push('/sign-in')
	}, [])
  return <div></div>;
};

export default Index;
