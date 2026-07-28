# 1452. People Whose List of Favorite Companies Is Not a Subset of Another List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/people-whose-list-of-favorite-companies-is-not-a-subset-of-another-list](https://leetcode.com/problems/people-whose-list-of-favorite-companies-is-not-a-subset-of-another-list)
**Companies:** Datadog, Google

---

## Problem Description
Given a list of people where each person has a list of favorite companies, return the indices of people whose list is **not** a subset of any other person's list. The result should be sorted in ascending order.

Constraints: `1 ≤ people.length ≤ 100`; each person's company list length ≤ 20; company names are non‑empty strings.

## Examples
| people | Output | Explanation |
|--------|--------|-------------|
| [["Google","Facebook"],["Google"],["Facebook","Amazon"]] | [0,2] | Person 0's list `{"Google","Facebook"}` is not a subset of any other list; Person 2's list `{"Facebook","Amazon"}` is also not a subset. Person 1's list is a subset of Person 0.
| [["A"],["B"],["C"]] | [0,1,2] | No list is a subset of another.

## Approach
Use set representation and compare each person's set with all others.

1. Convert each list of companies to a `SET`.
2. For each person `i`:
   - Assume `isSubset = false`.
   - Compare with every other person `j ≠ i`:
     * If `set_i` ⊆ `set_j`, set `isSubset = true` and break.
   - If `isSubset` remains false, include `i` in the answer.
3. Return the collected indices sorted (they are naturally in order of iteration).

## Walkthrough
For the first example:
| i | set_i | compared to j=0 | j=1 | j=2 | isSubset? |
|---|-------|----------------|-----|-----|-----------|
|0| {Google,Facebook} | – | {Google} does not contain both → false | {Facebook,Amazon} does not contain Google → false | false → keep 0 |
|1| {Google} | {Google,Facebook} contains → true → discard |
|2| {Facebook,Amazon} | {Google,Facebook} lacks Amazon → false | {Google} lacks both → false | – | false → keep 2 |
Result `[0,2]`.

## Complexity Analysis
- Time: O(N²·M) where N is number of people and M is average list size (set containment check).
- Space: O(N·M) for storing the sets.

## Follow‑Up Questions
1. How would you improve the runtime using bitmask encoding if the total number of distinct companies is small?
2. Can you solve the problem in O(N·log N) by sorting the sets by size and using a trie?
3. What changes are needed if you must also return the actual company lists, not just indices?

## Key Takeaway
Representing each person's favorites as a set enables straightforward subset checks; iterating over all pairs yields the required non‑subset indices.
