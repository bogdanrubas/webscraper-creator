import React from "react";
import IconButton from "./IconButton";
import Default from "./Default";

interface ButtonProps {
	// all:
	value?: string
	type?: 'icon'
	actionType?: 'add' | 'edit' | 'delete' | 'cancel'
	onClick?: any
	gridArea?: string
	style?: any
	buttonType?: "button" | "submit" | "reset" | undefined
	// iconButton:
	hintText?: string
	iconName?: string
}

const Button: React.FunctionComponent<ButtonProps> = ({ type, ...props }) => {
	function renderButton(type: string | undefined) {
		switch (type) {
			case "icon":
				return <IconButton {...props} />;

			default:
				return <Default {...props} />;
		}
	}

	return renderButton(type);
};

export default Button;
