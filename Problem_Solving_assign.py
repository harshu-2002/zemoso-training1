"""Alice and Bob are playing a game on a sequence a1,a2,…,an of length n. They move in turns and Alice moves first.
In the turn of each player, he or she should select an integer and remove it from the sequence. The game ends when there is no integer left in the sequence.
Alice wins if the sum of her selected integers is even; otherwise, Bob wins.
Your task is to determine who will win the game, if both players play optimally."""

l=[1,3,5,7,9]
l1=[]   
l2=[]
for i in l:
    if i%2==0:
        l1.append(i)
    else:
        l2.append(i)
a=0
b=0
for i in range(len(l1)):
    if i%2==0:
        a+=l1[i]
    else:
        b+=l1[i]
if len(l1)%2==0:
    for i in range(len(l2)):
        if i%2==0:
            a+=l2[i]
        else:
            b+=l2[i]
else:
    for i in range(len(l2)):
        if i%2==0:
            b+=l2[i]
        else:
            a+=l2[i]
if a%2==0:
    print('Alice')
else:
    print('Bob')
