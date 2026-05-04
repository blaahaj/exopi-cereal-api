# Thoughts

## What has been asked for

A single entity.

Authorization, though technically simply asking the user "Do you have a username and password?" (without actually asking them to _provide_ the username and password) would suffice.

An HTTP-based API (though it's unclear if REST would violate the requirements or not).

## What I would usually be thinking about

It's a blank slate, which is unusual, to the point of ringing alarm bells.

What are we optimising for? Sure, we could provide an OpenAPI spec, use the repository pattern, and so on... but this is a single-entity system. All of that would be premature optimisation.

Testing: with the possible exception of the sorting / filtering requirements, most of the system is not well suited to unit tests. Component testing, on the other hand, would be a better fit.

Do we lay the ground for potential future development? We are given no clue as to what direction that development might take.

Where will this run? What is the required uptime? Latency? Redundancy? Backups? Auditing? Access patterns?

Who/what are the clients?

What provides the authentication?

How big might this data get? What does the data flow look like?

Data churn and caching.

Field constraints: max size for the strings, min/max for the numbers. All unspecified. Several of the products have a negative value in the fields which look like they should always be non-negative.

Would REST satisfy the requirements? It's unclear. Should we use REST anyway? Should we provide something else, and layer REST on top?

Who will maintain this?

How long will the system run for?

Pagination.

## Therefore

Given the number of unanswered questions, where do we pick, on the scale of "do the absolute minimum possible to satisfy the stated requirements" and "so much extra provided that it's ridiculous overkill"?
