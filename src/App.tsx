import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import fallbackImage from './assets/no-logo.png';
import GitHubButton from 'react-github-btn';

import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
  RefinementList,
  Stats
} from 'react-instantsearch';

import { Panel } from './Panel';

import type { Hit } from 'instantsearch.js';

import './App.css';

const searchClient = algoliasearch(
  'UD1VE6KV0J',
  'd0b91f75be19811b3ba4dfb05e0c6deb'
);

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

const transformItems = (items) => {
  return items.map((item) => ({
    ...item,
    label: item.label.replace(/_/g, ' '),
  }));
};

const future = { preserveSharedStateOnUnmount: true };

export function App() {
  return (
    <div>

      <InstantSearch
        searchClient={searchClient}
        indexName="Accelerators"
        future={future}
        routing={true}
      >

        <Configure hitsPerPage={25} />

        <header className="header">
          <h1 className="header-title">
            Startups Resources (Funds, Accelerators, Studios etc)
            <Stats />
          </h1>
          <div className="gh-btn">
            <GitHubButton href="https://github.com/d1b1/techstar-search" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" data-show-count="true" aria-label="Star d1b1/techstar-search on GitHub">Star</GitHubButton>
          </div>
        </header>

        <div className="container-fluid">
          <div className="row">
            <div className="col-3 d-none d-md-block d-lg-block">

              <div className="filter-el">
                <h4>
                  Type:
                </h4>
                <RefinementList attribute="type" />
              </div>

              <div className="filter-el">
                <h4>
                  Investment Stage:
                </h4>
                <RefinementList attribute="stages" />
              </div>

              <div className="filter-el">
                <h4>
                  Industry:
                </h4>
                <RefinementList searchable="true" attribute="industries" searchablePlaceholder="Enter industry/vertical name..." limit="5" />
              </div>

              <div className="filter-el">
                <h4>
                  City:
                </h4>
                <RefinementList searchable="true" searchablePlaceholder="Enter a city..." attribute="city" />
              </div>

              <div className="filter-el">
                <h4>
                  State:
                </h4>
                <RefinementList searchable="true" searchablePlaceholder="Enter a state..." attribute="state" />
              </div>

              <div className="filter-el">
                <h4>
                  Country:
                </h4>
                <RefinementList attribute="country" />
              </div>

              <div className="filter-el">
                <h4>
                  Program Status:
                </h4>
                <RefinementList attribute="programType" transformItems={transformItems} />
              </div>

            </div>
            <div className="col-md-9 p-4">
              <SearchBox placeholder="Enter an program name..." className="searchbox" />

              <Hits hitComponent={Hit} />

              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

type HitProps = {
  hit: Hit;
};

function ImageWithFallback({ src, alt, ...props }) {
  const handleError = (e) => {
    e.target.src = fallbackImage;
  };

  return <img src={src || ''} alt={alt} onError={handleError} {...props} />;
}

function Hit({ hit }: HitProps) {
  return (
    <article>
      <div className="element">
        <h1>
          <Highlight attribute="name" hit={hit} />
        </h1>
        <p>
          <Highlight attribute="description" hit={hit} />
        </p>
        <p>
          <b>Location:</b> {hit.city}, {hit.state},{hit.country}<br />
          <b>Program Type:</b> {hit.programType || 'NA'}<br />
          <b>Type:</b> {hit['type']},&nbsp;
          <b>Industry:</b> {hit['industry']},&nbsp;
          <b>Investment Stages:</b> {hit['stages']}
        </p>
      </div>
    </article>
  );
}
