import React from "react";
import Icon from "layout/Icon";
import Button from "layout/Button";
import CreatePortal from "functions/createPortal";
import Overlay from "../Overlay";
import { ModalWrapper, Header, Body, Buttons } from "./styles";

interface ModalProps {
	// switch:
	type?: string
	// data:
	title: string
	closeModal: Function
	children?: any
	// styled-components:
	shouldShow: boolean
	width?: number
	height?: number
	// yes/no:
	yesFunction?: Function
	yesText?: string
	yesActionType?: 'add' | 'delete' | 'edit'
	noFunction?: Function
	noText?: string
	text?: string
}

const Modal: React.FunctionComponent<ModalProps> = ({
	type,
	children,
	title,
	shouldShow,
	closeModal,
	width,
	height,
	yesFunction,
	yesText,
	yesActionType,
	noFunction,
	noText,
	text,
}) => {
	function renderModal(type: string | undefined) {
		switch (type) {
			case "yes/no":
				return (
					<>
						<Overlay onClick={() => closeModal()} shouldShow={shouldShow} />

						<ModalWrapper width={width} height={height} shouldShow={shouldShow}>
							<Header>
								{title}
								<Icon
									name="close"
									size={15}
									strokeWidth={40}
									color="white"
									onClick={() => closeModal()}
								/>
							</Header>

							<Body height={height}>
								<p>{text}</p>
								<Buttons>
									<Button
										actionType='cancel'
										buttonType="button"
										value={noText}
										onClick={noFunction}
									/>
									<Button
										buttonType="button"
										value={yesText}
										actionType={yesActionType}
										onClick={yesFunction}
									/>
								</Buttons>
							</Body>
						</ModalWrapper>
					</>
				);

			default:
				return (
					<>
						<Overlay onClick={() => closeModal()} shouldShow={shouldShow} />

						<ModalWrapper width={width} height={height} shouldShow={shouldShow}>
							<Header>
								{title}
								<Icon
									name="close"
									size={15}
									strokeWidth={40}
									color="white"
									onClick={() => closeModal()}
								/>
							</Header>

							<Body height={height}>{children}</Body>
						</ModalWrapper>
					</>
				);
		}
	}

	return <CreatePortal selector="#modals">{renderModal(type)}</CreatePortal>;
};

export default Modal;
