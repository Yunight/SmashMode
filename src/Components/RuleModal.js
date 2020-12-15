import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import rulebg from "../otherPictures/rule_bg.png";

class RuleModal extends React.Component {


    render() {

        return (
            <Dialog onClose={(e) => this.props.handleEventClose(e,"isRule")} aria-labelledby="customized-dialog-title" open={this.props.showRuleModal} fullWidth={true} maxWidth="md">
                    <img
                        className={"autoimg"}
                          src={rulebg} alt={"CHARACTER"}/>
            </Dialog>

        );
    }
}

export default (RuleModal);