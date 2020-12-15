import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import ruleBg from "../otherPictures/rule_bg.png";
import bgimg1 from "../otherPictures/character_bg_1.png";

class RuleModal extends React.Component {


    render() {

        return (
            <Dialog onClose={(e) => this.props.handleEventClose(e,"isRule")}  aria-labelledby="customized-dialog-title" open={this.props.showRuleModal}  fullWidth={true} maxWidth="md" className={"ruleModal"}>

            </Dialog>

        );
    }
}

export default (RuleModal);