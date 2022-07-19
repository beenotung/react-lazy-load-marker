import React, { CSSProperties } from 'react';

interface Props {
  children?: any;
  onEnter: () => void;
  style?: CSSProperties;
  rootMargin?: string;
  threshold?: number; // 0.0 to 1.0
}

class LazyLoadMarker extends React.Component<Props> {
  div: HTMLDivElement | null = null;
  observer: IntersectionObserver | null = null;

  componentDidMount() {
    console.log('mount');
    if (!this.div) {
      console.error('div not mounted?');
      return;
    }
    this.startObserve(this.div);
  }

  stopObserve(div: HTMLDivElement) {
    if (this.observer) {
      this.observer.unobserve(div);
      this.observer.disconnect();
      this.observer = null;
    }
  }

  startObserve(div: HTMLDivElement) {
    this.stopObserve(div);
    this.observer = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            this.props.onEnter();
            return;
          }
        }
      },
      {
        rootMargin: this.props.rootMargin,
        threshold: this.props.threshold,
      },
    );
    this.observer.observe(div);
  }

  componentWillUnmount() {
    console.log('unmount');
    if (!this.div) {
      console.error('div not mounted?');
      return;
    }
    this.stopObserve(this.div);
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    if (
      this.div &&
      (nextProps.rootMargin !== this.props.rootMargin ||
        nextProps.threshold !== this.props.threshold)
    ) {
      this.startObserve(this.div);
    }
    return nextProps.children !== this.props.children;
  }

  render() {
    return (
      <div
        style={{
          display: 'inline-block',
          ...this.props.style,
        }}
        ref={(e) => (this.div = e)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default LazyLoadMarker;
