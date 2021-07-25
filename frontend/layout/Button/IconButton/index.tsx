import React, { useState } from "react";
import Icon from "layout/Icon";
import Hint from "layout/Hint";
import { IconButtonWrapper, Flex } from "./styles";

interface IconButtonProps {
	value?: string;
	// funkcja po kliknieciu:
	onClick?: any
	// gridArea jesli rodzic ma display: grid
	gridArea?: string
	// nazwa ikonki
	iconName?: string
	hintText?: string
	buttonType?: "button" | "submit" | "reset" | undefined
	style?: any
	actionType?: 'add' | 'edit' | 'delete' | 'cancel'
}

const IconButton: React.FunctionComponent<IconButtonProps> = ({
	value,
	onClick,
	gridArea,
	iconName,
	style,
	buttonType,
	hintText,
	actionType
}) => {
	const [showHint, setShowHint] = useState(false);

	return (
		<IconButtonWrapper
			gridArea={gridArea}
			style={style}
			type={buttonType}
			onClick={onClick !== undefined ? () => onClick() : null}
			onMouseEnter={() => setShowHint(true)}
			onMouseLeave={() => setShowHint(false)}
			actionType={actionType}
		>
			<Flex>
				{hintText && <Hint shouldShow={showHint} text={hintText} />}
				<Icon name={iconName} size={18} strokeWidth={40} color="black" />
				{value && <span>{value}</span>}
			</Flex>
		</IconButtonWrapper>
	);
};

export default IconButton;
