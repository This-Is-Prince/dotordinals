// Example CTA component in React

const CallToAction = () => {

  const goToSolar = () => {
    window.open('https://app.solarflare.io/exchange/swap?inputCurrency=ETH&outputCurrency=0xB1D7FD082b113A3a5a7b30a4710b59960D0d2421', '_blank');
  };

  return (
      <div className="cta-container">
          <p className="cta-message">
              There is no better tech than Polkadot for Ordinals.
              Join the movement and let's make Polkadot Ordinals a game changer!
          </p>
          <button className="cta-button" onClick={goToSolar}>
              Join Now
          </button>
      </div>
  );
};

export default CallToAction;
