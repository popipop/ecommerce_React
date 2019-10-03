import React from "react";
import styled from "styled-components";
import WithPanier from "./context/WithPanier";

import { Elements, StripeProvider } from "react-stripe-elements"

import "typeface-germania-one";
import "typeface-zilla-slab";
import "typeface-lato";
import "sanitize.css";

import Header from "./components/Header";
import LivreItem from "./components/LivreItem";
import Panier from "./components/Panier";
import CheckoutForm from "./components/CheckoutForm";



const Layout = styled.div`
  border: 5px solid GAINSBORO;
  background: DARKSLATEGRAY;
  color: GAINSBORO;
  font-family: "lato", sans-serif;
  padding-bottom: 64px;
`;

const App = ({ context }) => (
  <Layout>
    <Header />

    {
      context.state.livres && Object.keys(context.state.livres).map(id => {
        const livre = context.state.livres[id]
        return <LivreItem key={id} livre={livre} />
      })
    }
    
    <Panier />

    <StripeProvider apiKey='pk_test_nfwIlECA6zSaSfOZaggMUsdR'>
      <div id="checkout">
        <Elements>
          <CheckoutForm prixTotal={context.state.prixTotal} />
        </Elements>
      </div>
    </StripeProvider>
  </Layout>
);

export default WithPanier(App);
