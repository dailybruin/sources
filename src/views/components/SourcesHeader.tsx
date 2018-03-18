import * as React from 'react';
import { H1, Span } from 'glamorous';

class SourcesHeader extends React.Component<{}, { sauce: boolean }> {
  public state = {
    sauce: false,
  };

  public handleClick = () => {
    if (this.state.sauce) {
      this.setState({ sauce: false });
    } else {
      this.setState({ sauce: true });
    }
  };

  public render() {
    return (
      <H1
        fontFamily="Futura-Medium"
        textAlign="center"
        color="#000"
        fontSize="72px"
        margin="1rem 0"
      >
        S
        <Span cursor="pointer" onClick={this.handleClick}>
          {this.state.sauce ? 'a' : 'o'}
        </Span>
        u
        {this.state.sauce ? '' : 'r'}
        ces
      </H1>
    );
  }
}

export default SourcesHeader;
