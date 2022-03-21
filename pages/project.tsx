import { NextPage } from "next";
import Box from "@mui/material/Box";
import {
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
} from "@mui/material";
import { Fragment, VFC } from "react";
import Typography from "@mui/material/Typography";

const ProjectContainer: NextPage = () => {
  const Content: VFC = () => (
    <Fragment>
      {[1, 2, 3].map((i) => (
        <Card key={i} sx={{ my: 2 }} variant={"outlined"}>
          <CardContent>
            <Typography
              variant="body2"
              color="gray"
              sx={{ fontWeight: "bold" }}
            >
              2022年3月1日 - 2022年3月31日
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ mt: 1, fontWeight: "bold" }}
            >
              【テストシステムズ様】Webアプリケーション開発案件
            </Typography>
            <Grid
              container
              justifyContent={"flex-start"}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item container xs={12} sx={{ mb: 1 }}>
                <Grid item xs={3}>
                  <Typography variant="body2" color={"gray"}>
                    住所
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body2">テスト県テスト市1-1</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" color={"gray"}>
                    契約形態
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body2">
                    準委任契約 / フルリモート
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent={"flex-start"}
              item
              xs={12}
              sx={{ mb: 1 }}
            >
              <AvatarGroup max={4}>
                {["Kuzuha", "Kanae", "Minato Fuwa", "Yugamin", "Nei Ponto"].map(
                  (name, index) => (
                    <Avatar alt={name} key={index} />
                  )
                )}
              </AvatarGroup>
            </Grid>
            <Grid container direction={"column"} item xs={12}>
              <Typography variant={"caption"} color={"gray"}>
                使用技術
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip label="Next.js" color={'primary'} />
                <Chip label="TypeScript" color={'info'} />
              </Stack>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Fragment>
  );

  return (
    <Box sx={{ width: "95%" }}>
      <Content />
    </Box>
  );
};

export default ProjectContainer;
