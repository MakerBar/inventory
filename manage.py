#!/usr/bin/env python

import os
import sys

from django.core.management import execute_from_command_line

if __name__ == "__main__":
    os.environ.setdefault(
                "DJANGO_SETTINGS_MODULE",
                "settings.{}".format(sys.argv[1]))

    args = sys.argv[:1] + sys.argv[2:]
    execute_from_command_line(args)
