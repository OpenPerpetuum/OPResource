# OPResource
The OPResource server is a static file server with very particular files, names, and file content.

There is an index-like file called resource.dat that specifies the mapping of all resources to be served on the server. When connecting, the client expects this genxy format file in order to know where to fetch other resources and match version numbers. Clients will only download assets that are either missing or of a higher version.

To run a local OPResource server, clone the repo, install nodejs, and run `node index.js` 
This is a simple file server. You can host with any webserver. Node is used because it is an easy cross-platform solution for local development.

There are a number of files with particular meaning that is served from the resource index.
There are all the art assets of course, all of the a3m, mp3, png, dds, etc. that actually make 3d models, textures, icons, etc.
Then there are other files like the dictionary which we dont serve yet because the client doesnt load it dynamically :( client bug

You will have everything but the art/icon assets.

The definitionProperties file contains the mapping of all entitydefault (by def # ) to the various assets that represent it when rendered. Including: its icon, its model, and even more optional parameters depending on what the asset may be or require.

There is no documentation available for how to configure the resource server. Knowing how each thing needs to be defined, what params matter, what they mean, how they are named is entirely based on guess work by looking at other things defined in the file.

The resource server can serve any file that is contained in the client .GBF data.

The simplest way to create a new item is to find the definition of another similar item in the definitionProperties file. Note the defintion number.

Look for an example of using |copyFrom= key, . This directive tells the client to render this definition just like another. This is the easiest way to create a new definition and have it look/appear like any other of the same type.

Edit your perpetuum.ini to have the "resourceURL":"<-res server ip or url->"

this is how the server tells a connecting client where to get resources

If things get corrupted or you need to restart you can always delete your custom-BigHexStringxxx.gbf files from the Perpetuum client directory.