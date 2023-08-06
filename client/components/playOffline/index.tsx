import React, { useState } from "react";
import { Button } from "../common/ui/button";
import { Loader2 } from "lucide-react";

type Props = {};

const PlayOffline = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button variant="outline" type="submit" className="mt-2 w-full">
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        "Play Offline"
      )}
    </Button>
  );
};

export default PlayOffline;
