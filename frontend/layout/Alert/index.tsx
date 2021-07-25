import React, {
	// useState,
	useContext,
	useEffect,
	useState
} from "react";
import Icon from "layout/Icon";
import { AlertsContext } from "layout";
import { AlertWrapper, Body, Time, Text, Head } from "./styles";
// import { Transition } from "react-transition-group";

interface AlertProps {
	id: number;
	text: string;
	time: number;
}

const Alert: React.FunctionComponent<AlertProps> = ({
	id,
	text,
	children,
	time
}) => {
	const [show, setShow] = useState(false);
	const { deleteAlert, alerts } = useContext(AlertsContext);

	useEffect(() => {
		setShow(true);
		const showTimer = setTimeout(() => {
			setShow(false);
		}, time - 300);
		const closeTimer = setTimeout(close, time);

		return () => {
			clearTimeout(showTimer);
			clearTimeout(closeTimer);
		};
	}, []);

	const close = () => {
		deleteAlert(id);
	};

	return (
		<>
		</>
		// <Transition
		//   key={id}
		//   mountOnEnter
		//   unmountOnExit
		//   timeout={show ? 0 : 300}
		//   in={show}
		// >
		//   {(state: any) => {
		//     let className = state;
		//     return (
		//       <AlertWrapper className={className}>
		//         <Head>
		//           <Time time={show ? time : 0} />
		//           <Icon
		//             onClick={() => {
		//               setShow(false);
		//               console.log(alerts.length);

		//               setTimeout(() => {
		//                 close();
		//               }, 300);
		//             }}
		//             name="close"
		//             size={11}
		//           />
		//         </Head>

		//         <Body>
		//           <Text>{text}</Text>
		//           {children}
		//         </Body>
		//       </AlertWrapper>
		//     );
		//   }}
		// </Transition>
	);
};

export default Alert;
