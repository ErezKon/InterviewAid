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

In the world of Dota2, there are two parties: the Radiant and the Dire.

The Dota2 senate consists of senators coming from two parties. Now the Senate wants to decide on a change in the Dota2 game. The voting for this change is a round-based procedure. In each round, each senator can exercise **one** of the two rights:

- **Ban one senator's right:** A senator can make another senator lose all his rights in this and all the following rounds.
- **Announce the victory:** If this senator found the senators who still have rights to vote are all from the same party, he can announce the victory and decide on the change in the game.

Given a string `senate` representing each senator's party belonging. The character `'R'` and `'D'` represent the Radiant party and the Dire party. Then if there are `n` senators, the size of the given string will be `n`.

The round-based procedure starts from the first senator to the last senator in the given order. This procedure will last until the end of voting. All the senators who have lost their rights will be skipped during the procedure.

Suppose every senator is smart enough and will play the best strategy for his own party. Predict which party will finally announce the victory and change the Dota2 game. The output should be `"Radiant"` or `"Dire"`.

**Constraints:**
- `n == senate.length`
- `1 <= n <= 10^4`
- `senate[i]` is either `'R'` or `'D'`.

---

## Examples

**Example 1:**
```
Input: senate = "RD"
Output: "Radiant"
Explanation: The first senator comes from Radiant and he can just ban the next senator's right in round 1.
And the second senator can't exercise any rights anymore since his right has been banned.
And in round 2, the first senator can just announce the victory since he is the only guy in the senate who can vote.
```

**Example 2:**
```
Input: senate = "RDD"
Output: "Dire"
Explanation: The first senator comes from Radiant and he can just ban the next senator's right in round 1.
And the second senator can't exercise any rights anymore since his right has been banned.
And the third senator comes from Dire and he can ban the first senator's right in round 1.
And in round 2, the third senator can just announce the victory since he is the only guy in the senate who can vote.
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
