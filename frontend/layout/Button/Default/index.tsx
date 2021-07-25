import React from 'react';
import { ButtonWrapper } from './styles';

interface DefaultProps {
	value?: string
	onClick?: any
	gridArea?: string
	style?: any
	buttonType?: 'button' | 'submit' | 'reset' | undefined
	actionType?: 'add' | 'edit' | 'delete' | 'cancel'
}

const Default: React.FunctionComponent<DefaultProps> = ({
	value,
	onClick,
	gridArea,
	style,
	buttonType,
	actionType
}) => (
	<ButtonWrapper
		style={style}
		gridArea={gridArea}
		type={buttonType}
		onClick={onClick !== undefined ? () => onClick() : null}
		actionType={actionType}
	>
		{value}
	</ButtonWrapper>
);

export default Default;
