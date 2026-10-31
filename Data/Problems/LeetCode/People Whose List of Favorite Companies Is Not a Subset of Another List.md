# 1452. People Whose List of Favorite Companies Is Not a Subset of Another List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/people-whose-list-of-favorite-companies-is-not-a-subset-of-another-list](https://leetcode.com/problems/people-whose-list-of-favorite-companies-is-not-a-subset-of-another-list)
**Companies:** Datadog, Google

---

## Problem Description

Given the array `favoriteCompanies` where `favoriteCompanies[i]` is the list of favorites companies for the `ith` person (**indexed from 0**).

*Return the indices of people whose list of favorite companies is not a **subset** of any other list of favorites companies*. You must return the indices in increasing order.

**Constraints:**
- `1 <= favoriteCompanies.length <= 100`
- `1 <= favoriteCompanies[i].length <= 500`
- `1 <= favoriteCompanies[i][j].length <= 20`
- All strings in `favoriteCompanies[i]` are **distinct**.
- All lists of favorite companies are **distinct**, that is, If we sort alphabetically each list then `favoriteCompanies[i] != favoriteCompanies[j].`
- All strings consist of lowercase English letters only.

## Examples

**Example 1:**
```
Input: favoriteCompanies = [["leetcode","google","facebook"],["google","microsoft"],["google","facebook"],["google"],["amazon"]]
Output: [0,1,4]
Explanation: Person with index=2 has favoriteCompanies[2]=["google","facebook"] which is a subset of favoriteCompanies[0]=["leetcode","google","facebook"] corresponding to the person with index 0.
Person with index=3 has favoriteCompanies[3]=["google"] which is a subset of favoriteCompanies[0]=["leetcode","google","facebook"] and favoriteCompanies[1]=["google","microsoft"].
Other lists of favorite companies are not a subset of another list, therefore, the answer is [0,1,4].
```

**Example 2:**
```
Input: favoriteCompanies = [["leetcode","google","facebook"],["leetcode","amazon"],["facebook","google"]]
Output: [0,1]
Explanation: In this case favoriteCompanies[2]=["facebook","google"] is a subset of favoriteCompanies[0]=["leetcode","google","facebook"], therefore, the answer is [0,1].
```

**Example 3:**
```
Input: favoriteCompanies = [["leetcode"],["google"],["facebook"],["amazon"]]
Output: [0,1,2,3]
```

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

## Follow-Up Questions
1. How would you improve the runtime using bitmask encoding if the total number of distinct companies is small?
2. Can you solve the problem in O(N·log N) by sorting the sets by size and using a trie?
3. What changes are needed if you must also return the actual company lists, not just indices?

## Key Takeaway
Representing each person's favorites as a set enables straightforward subset checks; iterating over all pairs yields the required non-subset indices.
