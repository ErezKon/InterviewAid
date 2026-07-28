# 3815. Design Auction System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-auction-system](https://leetcode.com/problems/design-auction-system)
**Companies:** Google

---

## Problem Description

Design an auction system that allows creating auctions with an end time, placing bids from users, and ending auctions to determine the winning bid.

---

## Examples

**Example 1:**
```
Input: ["AuctionSystem","createAuction","placeBid","placeBid","endAuction"],
       [[],[10],[1,100,5],[2,150,5],[1]]
Output: [null,1,null,null,2]
Explanation:
AuctionSystem as = new AuctionSystem();
int id = as.createAuction(10); // auction ends at time 10, id = 1
as.placeBid(1, 100, 5); // user 100 bids $5 at time 5
as.placeBid(1, 150, 7); // user 150 bids $7 at time 7
int winner = as.endAuction(1); // returns 150 (highest bid)
```

**Example 2:**
```
Input: ["AuctionSystem","createAuction","placeBid","endAuction"],
       [[],[5],[1,200,3],[1]]
Output: [null,1,null,1]
Explanation:
as.createAuction(5) creates auction id 1 ending at time 5.
as.placeBid(1,200,3) places a $3 bid.
as.endAuction(1) returns user 200 as winner.
```

---

## Approach

```text
CLASS AuctionSystem:
    SET auctions ← empty map   // auctionId → {endTime, active, bidsHeap}
    SET nextId ← 1

    FUNCTION createAuction(endTime):
        SET auctions[nextId] ← {endTime: endTime, active: true, bidsHeap: empty max‑heap}
        SET id ← nextId
        INCREMENT nextId
        RETURN id

    FUNCTION placeBid(auctionId, userId, amount):
        IF auctionId NOT IN auctions OR NOT auctions[auctionId].active:
            RETURN // ignore invalid or ended auction
        PUSH (amount, userId) INTO auctions[auctionId].bidsHeap

    FUNCTION endAuction(auctionId):
        IF auctionId NOT IN auctions OR NOT auctions[auctionId].active:
            RETURN null
        SET auctions[auctionId].active ← false
        IF auctions[auctionId].bidsHeap IS EMPTY:
            RETURN null
        SET (maxAmount, winner) ← POP_MAX(auctions[auctionId].bidsHeap)
        RETURN winner
```

---

## Walkthrough

| Step | Operation | State Change | Explanation |
|------|-----------|--------------|-------------|
| 1 | `createAuction(10)` | auctions{1:{endTime:10, active:true, heap:[]}} | New auction id 1 created |
| 2 | `placeBid(1,100,5)` | heap → [(5,100)] | User 100 bids $5 |
| 3 | `placeBid(1,150,7)` | heap → [(7,150),(5,100)] | User 150 bids $7, becomes max |
| 4 | `endAuction(1)` | active:false, winner=150 | Auction ends, max‑heap yields winner 150 |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | `createAuction`: O(1); `placeBid`: O(log b) where b is number of bids for that auction; `endAuction`: O(log b) to pop max |
| **Space** | O(a + b) where a is number of auctions and b total bids stored |

---

## Follow-Up Questions

1. How would you support retrieving the top‑k highest bids without ending the auction?
2. How can you handle tie‑breaking when multiple bids have the same amount?
3. How would you persist auction data to survive server crashes?

---

## Key Takeaway

> **Use a max‑heap per auction to manage bids efficiently; it gives O(log n) insertion and O(1) access to the highest bid.**