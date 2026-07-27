# 14. Longest Common Prefix — Extended

See also: [Longest Common Prefix.md](Longest%20Common%20Prefix.md)

**Companies:** Accenture, Adobe, Alten, Amazon, American Express, Apple, Barclays, Bloomberg, Capgemini, Caterpillar, Cme Group, Deloitte, Deutsche Bank, Disney, Epam Systems, Ericsson, Fidelity, Fractal Analytics, Google, Hashedin, Hrt, Hsbc, Ibm, Infosys, Jane Street, Kotak Mahindra Bank, Maersk, Meta, Microsoft, Natwest, Nokia, Nvidia, Opentext, Oracle, Oyo, Palo Alto Networks, Persistent Systems, Phonepe, Publicis Sapient, Pubmatic, Pwc, Qualcomm, Quora, Revolut, Roblox, Samsung, Sap, Sigmoid, Target, Tcs, Tiktok, Turing, Uber, Virtusa, Visa, Walmart Labs, Wells Fargo, Wipro, Yahoo, Yelp, Zoho, Zopsmart
---

## Alternative Approaches

### Binary Search on Length — O(S·log m)

Binary search on the prefix length. Check if all strings share a prefix of that length.

### Trie — O(S)

Build a trie from all strings. The LCP is the path from root until a node has more than one child or is a word end.

### Divide and Conquer — O(S)

Split strings in half, find LCP of each half, then find LCP of those two results.

All approaches have the same O(S) total character comparisons. The vertical scan (character by character) is simplest.
