import os

__dir__ = os.path.dirname(__file__)
with open(os.path.join(__dir__, "input.txt")) as input_file:
    input = [int(line) for line in input_file.readlines()]
    for (i, n) in enumerate(input):
        for m in input[i:]:
            if n + m == 2020:
                print(n * m)
