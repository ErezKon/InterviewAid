# 1152. Analyze User Website Visit Pattern

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/analyze-user-website-visit-pattern
**Companies:** Amazon, Doordash, Google, Spotify, Uber, Whatnot
---

## Problem Description
You are given two string arrays `username` and `website` and an integer array `timestamp`. All the given arrays are of the same length and the tuple `[username[i], website[i], timestamp[i]]` indicates that the user `username[i]` visited the website `website[i]` at time `timestamp[i]`.

A **pattern** is a list of three websites (not necessarily distinct).

- For example, `["home", "away", "love"]`, `["leetcode", "love", "leetcode"]`, and `["luffy", "luffy", "luffy"]` are all patterns.

The **score** of a **pattern** is the number of users that visited all the websites in the pattern in the same order they appeared in the pattern.

- For example, if the pattern is `["home", "away", "love"]`, the score is the number of users `x` such that `x` visited `"home"` then visited `"away"` and visited `"love"` after that.
- Similarly, if the pattern is `["leetcode", "love", "leetcode"]`, the score is the number of users `x` such that `x` visited `"leetcode"` then visited `"love"` and visited `"leetcode"` **one more time** after that.
- Also, if the pattern is `["luffy", "luffy", "luffy"]`, the score is the number of users `x` such that `x` visited `"luffy"` three different times at different timestamps.

Return the **pattern** with the largest **score**. If there is more than one pattern with the same largest score, return the lexicographically smallest such pattern.

Note that the websites in a pattern **do not** need to be visited *contiguously*, they only need to be visited in the order they appeared in the pattern.

**Constraints:**
- `3 <= username.length <= 50`
- `1 <= username[i].length <= 10`
- `timestamp.length == username.length`
- `1 <= timestamp[i] <= 10^9`
- `website.length == username.length`
- `1 <= website[i].length <= 10`
- `username[i]` and `website[i]` consist of lowercase English letters.
- It is guaranteed that there is at least one user who visited at least three websites.
- All the tuples `[username[i], timestamp[i], website[i]]` are **unique**.

## Examples
```
Example 1:
  Input: username = ["joe","joe","joe","james","james","james","james","mary","mary","mary"],
         timestamp = [1,2,3,4,5,6,7,8,9,10],
         website = ["home","about","career","home","cart","maps","home","home","about","career"]
  Output: ["home","about","career"]
  Explanation: The tuples in this example are:
  ["joe","home",1],["joe","about",2],["joe","career",3],["james","home",4],["james","cart",5],
  ["james","maps",6],["james","home",7],["mary","home",8],["mary","about",9], and ["mary","career",10].
  The pattern ("home", "about", "career") has score 2 (joe and mary).
  The pattern ("home", "cart", "maps") has score 1 (james).
  The pattern ("home", "cart", "home") has score 1 (james).
  The pattern ("home", "maps", "home") has score 1 (james).
  The pattern ("cart", "maps", "home") has score 1 (james).
  The pattern ("home", "home", "home") has score 0 (no user visited home 3 times).
```
```
Example 2:
  Input: username = ["ua","ua","ua","ub","ub","ub"], timestamp = [1,2,3,4,5,6],
         website = ["a","b","a","a","b","c"]
  Output: ["a","b","a"]
```

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
