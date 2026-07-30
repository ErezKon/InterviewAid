# 649. Dota2 Senate

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/dota2-senate](https://leetcode.com/problems/dota2-senate)
**Companies:** Amazon, American Airlines, Bloomberg, Google, Meta, Valve

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Two Queues](#approach-two-queues--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

In the Dota2 Senate, senators from **Radiant** (`'R'`) and **Dire** (`'D'`) parties vote in rounds. Each senator can **ban** one opposing senator (removing their voting rights). If all remaining senators belong to one party, that party wins. Given a string `senate` representing the voting order, predict which party wins assuming optimal play.

**Constraints:**
- `1 <= senate.length <= 10^4`
- `senate[i]` is either `'R'` or `'D'`

---

## Examples

```
Input: senate = "RD"
Output: "Radiant"
Explanation: R bans D first (earlier index). Radiant wins.

Input: senate = "RDD"
Output: "Dire"
Explanation: R bans first D, second D bans R in next round. Dire wins.
```

---

## Key Insight

> Each senator should **greedily ban the nearest upcoming opponent** to prevent them from banning an ally. Use two queues holding indices — the senator with the smaller index acts first and bans the other. The winner re-enters at index `i + n` (simulating the next circular round).

---

## Approach: Two Queues — O(n) ✅

```
FUNCTION predictPartyVictory(senate):
    n = len(senate)
    rQueue = deque()
    dQueue = deque()

    FOR i, char IN enumerate(senate):
        IF char == 'R': rQueue.APPEND(i)
        ELSE: dQueue.APPEND(i)

    WHILE rQueue AND dQueue:
        r = rQueue.POPLEFT()
        d = dQueue.POPLEFT()
        // Earlier index bans the other; winner goes to next round
        IF r < d:
            rQueue.APPEND(r + n)
        ELSE:
            dQueue.APPEND(d + n)

    RETURN "Radiant" IF rQueue ELSE "Dire"
```

---

## Walkthrough

```
senate = "RDDRD"
n = 5

Initial queues:
  rQueue: [0, 3]    (R at indices 0, 3)
  dQueue: [1, 2, 4] (D at indices 1, 2, 4)

Round 1:
  r=0 vs d=1 → 0 < 1 → R wins, rQueue.append(0+5=5) → rQueue:[3,5], dQueue:[2,4]
  r=3 vs d=2 → 3 > 2 → D wins, dQueue.append(2+5=7) → rQueue:[5], dQueue:[4,7]

Round 2:
  r=5 vs d=4 → 5 > 4 → D wins, dQueue.append(4+5=9) → rQueue:[], dQueue:[7,9]

rQueue empty → "Dire" ✅
```

---

## Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | O(n) | Each senator is processed at most twice (once per round) |
| **Space** | O(n) | Two queues holding all senator indices |

---

## Follow-Up Questions

**Q1: Why add `n` instead of just putting at the end?**
> Adding `n` preserves relative ordering across rounds. The winner acts again only after all current-round senators have gone.

**Q2: Why is greedy (ban nearest opponent) optimal?**
> Banning a later opponent would let a nearer opponent act first and potentially ban one of your allies. Always neutralize the immediate threat.

**Q3: What if multiple rounds are needed?**
> The queue naturally handles this — winners re-enter and keep competing until one party is eliminated.

---

## Key Takeaway

> **Greedy queue simulation: each senator bans the nearest opponent (smallest index). Two queues + re-insertion at `index + n` elegantly handles circular multi-round voting.**
