# 3433. Count Mentions Per User

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-mentions-per-user](https://leetcode.com/problems/count-mentions-per-user)
**Companies:** Bcg, Bloomberg, Microsoft, Visa

---

## Problem Description
Given a chronologically ordered list of events in a chat system, each event is either a user coming online/offline or a message sent by a user that may contain `@` mentions of other users. For every user, compute how many times they were mentioned while they were online. Only mentions that occur after a user has come online and before they go offline count.

## Examples
**Example 1:**
```
Input: events = ["login A", "login B", "msg A @B", "logout B", "msg A @B"]
Output: {"A":0, "B":1}
Explanation: B is mentioned once while online (third event). The last mention occurs after B logged out, so it is ignored.
```
**Example 2:**
```
Input: events = ["login X", "msg X @X", "logout X"]
Output: {"X":1}
Explanation: Self‑mentions count as long as the user is online.
```

## Approach
Maintain a hash map `online` tracking which users are currently online and another map `count` for mention totals. Iterate through events:
- On a `login` event, set `online[user] ← true`.
- On a `logout` event, set `online[user] ← false`.
- On a `msg` event, parse all `@` mentions; for each mentioned user `u`, if `online[u]` is true, increment `count[u]`.
Parsing can be done with a simple scan for `@` characters.

## Walkthrough
| Step | Event | Action | online set | count map |
|------|-------|--------|------------|----------|
| 1 | login A | add A | {A} | {A:0} |
| 2 | login B | add B | {A,B} | {A:0,B:0} |
| 3 | msg A @B | B is online → count[B]++ | {A,B} | {A:0,B:1} |
| 4 | logout B | remove B | {A} | {A:0,B:1} |
| 5 | msg A @B | B offline → no change |

## Complexity Analysis
- **Time:** O(E + M) where `E` is number of events and `M` total number of mentions parsed.
- **Space:** O(U) for storing online status and counts of `U` distinct users.

## Follow‑Up Questions
1. How would you handle out‑of‑order events where timestamps are not sorted?
2. Extend the solution to support group mentions (e.g., `@team`) with hierarchical online status.
3. What if the system needs to support real‑time queries of the current mention count for a user?

## Key Takeaway
By tracking online status in a hash map and updating counts only when a mentioned user is online, the problem reduces to a single linear pass over the event log.
