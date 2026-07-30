# 911. Online Election

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/online-election](https://leetcode.com/problems/online-election)
**Companies:** Bloomberg, Flipkart, Google

---

## Problem Description
Design a class `TopVotedCandidate` that is initialized with two integer arrays `persons` and `times`, where `persons[i]` is the person who received a vote at moment `times[i]`. Implement a method `q(t)` that returns the person with the highest number of votes at time `t` (inclusive). If there is a tie, return the most recent voted person.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `TopVotedCandidate([0,1,1,0,0,1,0],[0,5,10,15,20,25,30])` then `q(3)` | `0` | At time 3 only the first vote (person 0) has occurred. |
| `q(10)` | `1` | Votes up to time 10: person 0 → 1, person 1 → 2, leader is 1. |
| `q(25)` | `1` | Leader after time 25 is person 1. |

## Approach
**Pre‑process with Prefix Leaders + Binary Search**
1. Iterate through `persons` while maintaining a vote count map.
2. After each vote, determine the current leader (choose higher count or later vote on tie) and store it in a `leaders` list aligned with `times`.
3. For a query `q(t)`, binary‑search `times` to find the greatest index `i` where `times[i] ≤ t` and return `leaders[i]`.

```text
FUNCTION constructor(persons, times):
    voteCount ← MAP()
    leaders ← []
    currentLeader ← -1
    FOR i FROM 0 TO LENGTH(persons)-1:
        p ← persons[i]
        voteCount[p] ← voteCount.get(p,0) + 1
        IF voteCount[p] ≥ voteCount.get(currentLeader,0):
            currentLeader ← p
        APPEND currentLeader TO leaders
    STORE times, leaders

FUNCTION q(t):
    idx ← BINARY_SEARCH_RIGHT(times, t) - 1
    RETURN leaders[idx]
```

## Walkthrough
Given `persons = [0,1,1,0]` and `times = [0,5,10,15]`:
| i | vote | voteCount | currentLeader | leaders |
|---|------|-----------|---------------|---------|
|0|0|{0:1}|0|[0]
|1|1|{0:1,1:1}|1 (tie → later)|[0,1]
|2|1|{0:1,1:2}|1|[0,1,1]
|3|0|{0:2,1:2}|0 (tie → later)|[0,1,1,0]
A query `q(12)` binary‑searches `times` → index 2 → returns `leaders[2] = 1`.

## Complexity Analysis
- Pre‑processing: `O(n)` time, `O(n)` space for `leaders` and `times`.
- Query: `O(log n)` time for binary search, `O(1)` extra space.

## Follow‑Up Questions
1. How would you support updates (new votes) after initialization?
2. Can you answer queries in `O(1)` time using additional data structures?
3. Extend the design to return the top‑`k` candidates at time `t`.

## Key Takeaway
Storing the leader after each vote and using binary search on timestamps turns repeated queries into fast `O(log n)` operations.
