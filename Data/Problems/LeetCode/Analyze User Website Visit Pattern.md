# 1152. Analyze User Website Visit Pattern

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/analyze-user-website-visit-pattern
**Companies:** Amazon, Doordash, Google, Spotify, Uber, Whatnot
---

## Problem Description
Given three parallel arrays `username`, `timestamp`, and `website`, each entry records that a user visited a website at a specific time. For each user, sort their visits by timestamp and consider all 3‑website sequences they visited (order matters). Return the 3‑sequence visited by the largest number of users. If multiple sequences have the same count, return the lexicographically smallest one.

## Examples
**Example 1**
```
Input:
username = ["joe","joe","joe","james","james","james","james"]
timestamp = [1,2,3,4,5,6,7]
website = ["home","about","career","home","cart","maps","home"]
Output: ["home","about","career"]
```
The sequence "home","about","career" is visited by user "joe" only, but it is the most frequent 3‑sequence across users.

**Example 2**
```
Input:
username = ["u1","u1","u2","u2","u2"]
timestamp = [1,2,3,4,5]
website = ["a","b","a","b","c"]
Output: ["a","b","c"]
```
Both users share the sequence "a","b","c", making it the most common.

## Approach
1. Group visits by user and sort each group by timestamp.
2. For each user, generate all unique 3‑website combinations preserving order.
3. Count how many users have each combination using a hash map.
4. Return the combination with the highest count; break ties by lexicographic order.

```text
FUNCTION mostVisitedPattern(username, timestamp, website):
    // Build per‑user visit lists sorted by time
    userVisits ← MAP()
    FOR (u, t, w) IN SORTED(zip(username, timestamp, website)):
        IF u NOT IN userVisits:
            userVisits[u] ← []
        APPEND w TO userVisits[u]

    patternCount ← MAP(default=0)
    FOR user, sites IN userVisits:
        // Generate all 3‑length ordered combos without repetition per user
        combos ← SET()
        n ← LENGTH(sites)
        FOR i ← 0 TO n-3:
            FOR j ← i+1 TO n-2:
                FOR k ← j+1 TO n-1:
                    combo ← (sites[i], sites[j], sites[k])
                    ADD combo TO combos
        FOR combo IN combos:
            patternCount[combo] ← patternCount[combo] + 1

    // Find max count, then smallest lexicographically
    best ← NULL
    bestCount ← -1
    FOR combo, cnt IN patternCount:
        IF cnt > bestCount OR (cnt == bestCount AND combo < best):
            bestCount ← cnt
            best ← combo
    RETURN LIST(best)
```

## Walkthrough
For the first example, after sorting we have:
- joe: ["home","about","career"] → only one 3‑combo.
- james: ["home","cart","maps","home"] → combos: (home,cart,maps), (home,cart,home), (home,maps,home), (cart,maps,home).
Counting frequencies, the combo (home,about,career) appears once, which is the highest.

## Complexity Analysis
*Time*: O(N + U·K³) where N is total visits, U is number of users, and K is the maximum visits per user (K is small, ≤ 50). The triple loop generates at most C(K,3) combos per user.
*Space*: O(U·K) for storing per‑user visits and O(C) for the pattern hash map.

## Follow‑Up Questions
1. How would you adapt the solution if the sequence length were variable (e.g., any length L)?
2. Can you compute the result in a single pass without storing all visits?
3. How would you handle ties using a custom ordering (e.g., by earliest occurrence)?

## Key Takeaway
Group and sort each user's visits, generate unique ordered triples, and use a frequency map to identify the most common 3‑website pattern.
