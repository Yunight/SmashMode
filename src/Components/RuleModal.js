import React from 'react';
import Dialog from "@material-ui/core/Dialog";

class RuleModal extends React.Component {


    render() {

        return (
            <Dialog onClose={(e) => this.props.handleEventClose(e,"isRule")}  aria-labelledby="customized-dialog-title" open={this.props.showRuleModal}  fullWidth={true} maxWidth="md" className={"ruleModal"}>

            </Dialog>

        );
    }
}

export default (RuleModal);